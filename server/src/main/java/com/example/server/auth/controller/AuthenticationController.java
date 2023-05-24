package com.example.server.auth.controller;

import com.example.server.auth.dto.*;
import com.example.server.auth.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthenticationController {
    private final AuthenticationService authService;

    @PostMapping("/registration")
    public ResponseEntity<AuthenticationResponseDto> register(
            @RequestBody RegistrationRequestDto request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }



    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDto> authenticate(
            @RequestBody AuthenticationRequestDto request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponseDto> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        return ResponseEntity.ok(authService.refreshToken(request, response));
    }

   @GetMapping("/me")
    public ResponseEntity<UserDto> getUserByToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        return ResponseEntity.ok(authService.getUserByToken(request, response));
    }

    //
    // EXCEPTION_HANDLERS
    //

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<ErrorDto> authenticationError(SQLException exception) {
        ErrorDto errorResponse = ErrorDto.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDto> authenticationError(BadCredentialsException exception) {
        ErrorDto errorResponse = ErrorDto.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(AuthenticationServiceException.class)
    public ResponseEntity<ErrorDto> authenticationError(AuthenticationServiceException exception) {
        ErrorDto errorResponse = ErrorDto.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> authenticationError(Exception exception) {
        ErrorDto errorResponse = ErrorDto.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }

}
