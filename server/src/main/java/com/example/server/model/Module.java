package com.example.server.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Data
@Entity
@Table(name = "modules")
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // TODO: Добавить number для нумеризации тем

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String imageUri;

    @OneToMany(mappedBy = "module")
    @JsonManagedReference
    private Collection<Topic> topics;
}
