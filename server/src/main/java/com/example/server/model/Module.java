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

    @Column(nullable = false)
    private Integer number;


    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String imageUri;

    @OneToMany(mappedBy = "module")
    @JsonManagedReference
    private Collection<Topic> topics;
}
