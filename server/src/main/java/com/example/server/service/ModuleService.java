package com.example.server.service;

import com.example.server.model.Topic;
import com.example.server.model.Module;

import java.util.Collection;
import java.util.Optional;

public interface ModuleService {
    Module save(Module module);
    Module delete(Long id) throws Exception;
    Optional<Module> findById(Long id);
    Collection<Module> findAll();
    Collection<Topic> findAllTopicsByModuleId(Long id);
}
