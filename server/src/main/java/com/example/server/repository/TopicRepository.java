package com.example.server.repository;

import com.example.server.model.Module;
import com.example.server.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;


public interface TopicRepository extends JpaRepository<Topic, Long> {
    Collection<Topic> findAllByModuleId(Long id);

    @Query("SELECT t FROM Topic t WHERE t.module.id = :moduleId ORDER BY  t.id DESC LIMIT 1")
    Topic findLast(Long moduleId);
}
