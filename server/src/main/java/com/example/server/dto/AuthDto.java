package com.example.server.dto;

import com.example.server.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthDto {

    private Long id;
    private String username;
    private String email;
    private Integer fireDays;
    private Date lastPlay;

    public AuthDto(User user){
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.fireDays = user.getFireDays();
        this.lastPlay = user.getLastPlay();
    }


}
