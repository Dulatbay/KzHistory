package com.example.server.repository;

import com.example.server.model.Module;
import com.example.server.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface ModuleRepository extends JpaRepository<Module, Long> {
}
