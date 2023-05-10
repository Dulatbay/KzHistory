package com.example.server.controller;

import com.example.server.dto.AuthDto;
import com.example.server.dto.LoginDto;
import com.example.server.dto.RegDto;
import com.example.server.exceptions.AuthException;
import com.example.server.model.User;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthDto> login(@RequestBody LoginDto loginDto) {
        Optional<User> user;
        if (this.isEmailAddress(loginDto.getUsernameOrEmail())) {
            user = userService.findByEmail(loginDto.getUsernameOrEmail());
        } else {
            user = userService.findByUsername(loginDto.getUsernameOrEmail());
        }
        if (user.isEmpty()) throw new AuthException("User not found");
        if (!Objects.equals(user.get().getPassword(), loginDto.getPassword()))
            throw new AuthException("Incorrect password");

        AuthDto response = new AuthDto(user.get());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/registration")
    public ResponseEntity<User> registration(@RequestBody RegDto regDto) throws Exception {
        boolean isUniqueEmail = userService.findByEmail(regDto.getEmail()).isEmpty();
        if (!isUniqueEmail) throw new AuthException("Email must be unique");

        boolean isUniqueUsername = userService.findByUsername(regDto.getUsername()).isEmpty();
        if (!isUniqueUsername) throw new AuthException("Username must be unique");

        User user = new User();

        user.setEmail(regDto.getEmail());
        user.setUsername(regDto.getUsername());
        user.setPassword(regDto.getPassword());
        user.setLeague("BOY");

        System.out.println(user.getUsername());
        System.out.println(user.getLeague());

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleCustomException(UsernameNotFoundException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<String> handleCustomException(AuthException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Auth error: " + e.getMessage());
    }

    private boolean isEmailAddress(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

}
