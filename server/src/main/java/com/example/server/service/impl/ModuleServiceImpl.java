package com.example.server.service.impl;

import com.example.server.model.Module;
import com.example.server.model.Topic;
import com.example.server.repository.ModuleRepository;
import com.example.server.repository.TopicRepository;
import com.example.server.service.ModuleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ModuleServiceImpl implements ModuleService {
    private final ModuleRepository moduleRepository;
    private final TopicRepository topicRepository;

    @Override
    public Module save(Module module) {
        Module lastModule = moduleRepository.findLast();

        if (lastModule == null) module.setNumber(1);
        else module.setNumber(lastModule.getNumber() + 1);

        return moduleRepository.save(module);
    }

    @Override
    public Module delete(Long id) throws Exception {
        Optional<Module> optionalModule = this.findById(id);

        if (optionalModule.isEmpty()) throw new Exception("Module not found");

        moduleRepository.delete(optionalModule.get());

        return optionalModule.get();
    }

    @Override
    public Optional<Module> findById(Long id) {
        return moduleRepository.findById(id);
    }

    @Override
    public Collection<Module> findAll() {
        return moduleRepository.findAll();
    }

    @Override
    public Collection<Topic> findAllTopicsByModuleId(Long id) {
        return topicRepository.findAllByModuleId(id);
    }
}
