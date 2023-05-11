package com.example.server.controller;

import com.example.server.dto.AuthDto;
import com.example.server.dto.LoginDto;
import com.example.server.dto.RegDto;
import com.example.server.exceptions.AuthException;
import com.example.server.model.Topic;
import com.example.server.model.User;
import com.example.server.service.FileService;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final FileService fileService;

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
    public ResponseEntity<AuthDto> registration(@RequestBody RegDto regDto) throws Exception {
        boolean isUniqueEmail = userService.findByEmail(regDto.getEmail()).isEmpty();
        if (!isUniqueEmail) throw new AuthException("Email must be unique");

        boolean isUniqueUsername = userService.findByUsername(regDto.getUsername()).isEmpty();
        if (!isUniqueUsername) throw new AuthException("Username must be unique");

        User user = new User();

        user.setEmail(regDto.getEmail());
        user.setUsername(regDto.getUsername());
        user.setPassword(regDto.getPassword());
        user.setLeague("BOY");

        user = userService.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthDto(user));
    }

    @PatchMapping("/users/edit-image")
    public ResponseEntity<AuthDto> editImage(@RequestParam("image") MultipartFile image,
                                             @RequestParam("userId") Long userId) throws Exception {
        Optional<User> userFromDb = userService.findById(userId);

        if (userFromDb.isEmpty()) throw new Exception("User not found");

        String imageUri = "";
        try {
            imageUri = fileService.createFile(image);
            userFromDb.get().setImageUri(imageUri);
            User user = userService.patch(userFromDb.get());
            return ResponseEntity.status(HttpStatus.OK).body(new AuthDto(user));
        } catch (Exception e) {
            fileService.deleteFile(imageUri);
            throw e;
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<AuthDto> getById(@PathVariable Long id) {
        return ResponseEntity.status(200).body(new AuthDto(userService.findById(id).orElse(new User())));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUsernameNotFoundException(UsernameNotFoundException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<String> handleAuthException(AuthException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Auth error: " + e.getMessage());
    }

    private boolean isEmailAddress(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

}
