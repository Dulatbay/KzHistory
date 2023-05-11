package com.example.server.repository;

import com.example.server.model.Module;
import com.example.server.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface ModuleRepository extends JpaRepository<Module, Long> {
    @Query("SELECT m FROM Module m ORDER BY m.id DESC LIMIT 1")
    Module findLast();

    Module findByNumber(Integer number);
}
