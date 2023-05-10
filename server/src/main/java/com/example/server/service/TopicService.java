package com.example.server.service;

import com.example.server.model.Topic;

import java.util.Collection;
import java.util.Optional;

public interface TopicService {
    Topic save(Topic topic);
    Topic delete(Long id) throws Exception;
    Optional<Topic> findById(Long id);

    Collection<Topic> findAll();
}
