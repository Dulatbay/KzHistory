package com.example.server.repository;

import com.example.server.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;


public interface TopicRepository extends JpaRepository<Topic, Long> {
    Collection<Topic> findAllByModuleId(Long id);
}
