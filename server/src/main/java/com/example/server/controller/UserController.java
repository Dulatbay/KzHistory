package com.example.server.controller;

import com.example.server.auth.model.user.User;
import com.example.server.service.FileService;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PatchMapping("/users/edit-image")
    public ResponseEntity editImage(@RequestParam("image") MultipartFile image,
                                    @RequestParam("userId") Integer userId) throws Exception {
        Optional<User> userFromDb = userService.findById(userId);

        if (userFromDb.isEmpty()) throw new Exception("User not found");

        String imageUri = "";
        try {
            imageUri = fileService.createFile(image);
            userFromDb.get().setImageUri(imageUri);
            User user = userService.patch(userFromDb.get());
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            fileService.deleteFile(imageUri);
            throw e;
        }
    }

    private boolean isEmailAddress(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

}
