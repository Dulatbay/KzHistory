package com.example.server.service;

import com.example.server.model.Module;
import com.example.server.model.Topic;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.Optional;

public interface TopicService {
    Topic save(Topic topic);
    Topic delete(Long id) throws Exception;
    Optional<Topic> findById(Long id);
    Collection<Topic> findAll();

    Topic findTopic(Integer topicNumber, Integer moduleNumber) throws Exception;
}
