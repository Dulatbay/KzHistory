package com.example.server.controller;

import com.example.server.model.Topic;
import com.example.server.service.TopicService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api/v1/topics")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
public class TopicController {
    private TopicService topicService;
    @GetMapping("/get-all")
    private ResponseEntity<Collection<Topic>> getAll(){
        System.out.println(1);
        return ResponseEntity.ok(topicService.findAll());
    }

}
