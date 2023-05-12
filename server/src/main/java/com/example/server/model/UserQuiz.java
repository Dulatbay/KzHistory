package com.example.server.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Data
@Entity
@Table(name = "userQuizes")
public class UserQuiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ElementCollection
    private Collection<Integer> answerIndexes = new ArrayList<>();

    private LocalTime date = LocalTime.now();
}
