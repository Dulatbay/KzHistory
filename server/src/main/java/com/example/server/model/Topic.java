package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "topics")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer number;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String fileUri;

    @Column(nullable = false)
    private String imageUri;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "moduleId")
    private Module module;
}
