package com.example.server.auth.dto;

import com.example.server.auth.model.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequestDto {
    private String username;
    private String email;
    private String password;
    private Role role;
}
