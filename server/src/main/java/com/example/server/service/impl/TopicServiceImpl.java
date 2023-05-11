package com.example.server.service.impl;

import com.example.server.model.Module;
import com.example.server.model.Topic;
import com.example.server.repository.ModuleRepository;
import com.example.server.repository.TopicRepository;
import com.example.server.service.TopicService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Objects;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TopicServiceImpl implements TopicService {
    private final TopicRepository topicRepository;
    private final ModuleRepository moduleRepository;

    @Override
    public Topic save(Topic topic) {
        Topic lastTopic = topicRepository.findLast(topic.getModule().getId());


        if(lastTopic == null) topic.setNumber(1);
        else topic.setNumber(lastTopic.getNumber() + 1);

        return topicRepository.save(topic);
    }

    @Override
    public Topic delete(Long id) throws Exception {
        Optional<Topic> optionalTopic = this.findById(id);

        if (optionalTopic.isEmpty()) throw new Exception("Topic not found");

        topicRepository.delete(optionalTopic.get());

        return optionalTopic.get();
    }

    @Override
    public Optional<Topic> findById(Long id) {
        return topicRepository.findById(id);
    }

    @Override
    public Collection<Topic> findAll() {
        return topicRepository.findAll();
    }

    @Override
    public Topic findTopic(Integer topicNumber, Integer moduleNumber) throws Exception {
        Module module = moduleRepository.findByNumber(moduleNumber);
        if(module == null) throw new Exception("Module not found");

        Optional<Topic> optionalTopic = module.getTopics()
                .stream()
                .filter(topic -> Objects.equals(topic.getNumber(), topicNumber))
                .findFirst();
        if(optionalTopic.isEmpty()) throw new Exception("Topic not found");

        return optionalTopic.get();
    }
}
