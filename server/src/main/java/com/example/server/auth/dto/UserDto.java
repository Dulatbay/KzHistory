package com.example.server.auth.dto;

import com.example.server.auth.model.user.Role;
import com.example.server.auth.model.user.User;
import com.example.server.model.LeagueType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String username;
    private String email;
    private LeagueType league;
    private Date lastPlay;
    private String imageUri;
    private Role role;

    public UserDto(User user){
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.lastPlay = user.getLastPlay();
        this.league = user.getLeague();
        this.imageUri = user.getImageUri();
        this.role = user.getRole();
    }
}
