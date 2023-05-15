package com.example.server.auth.service;

import com.example.server.auth.dto.AuthenticationRequestDto;
import com.example.server.auth.dto.AuthenticationResponseDto;
import com.example.server.auth.dto.RegistrationRequestDto;
import com.example.server.auth.dto.UserDto;
import com.example.server.auth.model.token.Token;
import com.example.server.auth.model.token.TokenType;
import com.example.server.auth.model.user.Role;
import com.example.server.auth.model.user.User;
import com.example.server.auth.repository.TokenRepository;
import com.example.server.auth.repository.UserRepository;
import com.example.server.model.League;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();

        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());

        if (validUserTokens.isEmpty())
            return;

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenRepository.saveAll(validUserTokens);
    }

    public AuthenticationResponseDto register(RegistrationRequestDto request) {
        var user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .league(League.LITTLE_BOY)
                .role(Role.USER)
                .build();

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        saveUserToken(savedUser, jwtToken);

        return AuthenticationResponseDto.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userDto(new UserDto(user))
                .build();
    }

    public AuthenticationResponseDto authenticate(AuthenticationRequestDto request) {

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException(String.format("Пользователь с почтой \"%s\" не найден", request.getEmail())));

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException exception) {
            throw new BadCredentialsException("Не правильный пароль");
        }

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        return AuthenticationResponseDto.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .userDto(new UserDto(user))
                .build();
    }

    public AuthenticationResponseDto refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String email;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new AuthenticationServiceException("Invalid signature of token");
        }

        refreshToken = authHeader.substring(7);
        try {
            email = jwtService.extractEmail(refreshToken);
        } catch (Exception e) {
            throw new AuthenticationServiceException("Invalid signature of token");
        }

        if (email == null)
            throw new AuthenticationServiceException("Invalid token");

        User user = this.userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new AuthenticationServiceException("Email not found")
                );

        if (jwtService.isTokenValid(refreshToken, user)) {
            var accessToken = jwtService.generateToken(user);

            revokeAllUserTokens(user);

            saveUserToken(user, accessToken);
            return AuthenticationResponseDto.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .userDto(new UserDto(user))
                    .build();
        }
        throw new AuthenticationServiceException("Invalid token");


    }
}
