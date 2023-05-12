package com.example.server.auth.controller;

import com.example.server.auth.dto.AuthenticationErrorDto;
import com.example.server.auth.dto.AuthenticationRequestDto;
import com.example.server.auth.dto.AuthenticationResponseDto;
import com.example.server.auth.dto.RegistrationRequestDto;
import com.example.server.auth.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.SignatureException;
import java.sql.SQLException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authService;

    @PostMapping("/registration")
    public ResponseEntity<AuthenticationResponseDto> register(
            @RequestBody RegistrationRequestDto request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDto> authenticate(
            @RequestBody AuthenticationRequestDto request
    )  {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authService.refreshToken(request, response);
    }

    //
    // EXCEPTION_HANDLERS
    //

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<AuthenticationErrorDto> authenticationError(SQLException exception) {
        AuthenticationErrorDto errorResponse = AuthenticationErrorDto.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<AuthenticationErrorDto> authenticationError(BadCredentialsException exception) {
        AuthenticationErrorDto errorResponse = AuthenticationErrorDto.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(AuthenticationServiceException.class)
    public ResponseEntity<AuthenticationErrorDto> authenticationError(AuthenticationServiceException exception) {
        AuthenticationErrorDto errorResponse = AuthenticationErrorDto.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }

}
