package com.example.server.controller;

import com.example.server.auth.dto.ErrorDto;
import com.example.server.auth.dto.UserDto;
import com.example.server.auth.model.user.User;
import com.example.server.auth.repository.UserRepository;
import com.example.server.service.FileService;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    private final UserService userService;
    private final FileService fileService;
    private final UserRepository userRepository;

    //DEV_TOOL
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable Integer id) throws Exception {
        var user = userRepository.findById(id).orElseThrow(()-> new Exception("User not found"));
        return ResponseEntity.ok(new UserDto(user));
    }


    @PatchMapping("/edit-image")
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

    // EXCEPTION HANDLERS
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDto> error(Exception exception){
        ErrorDto errorResponse = ErrorDto.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }


    private boolean isEmailAddress(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
