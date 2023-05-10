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

    // TODO: Добавить number для нумеризации тем

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String contentHTML;

    @Column(nullable = false)
    private String imageUri;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "moduleId")
    private Module module;
}
