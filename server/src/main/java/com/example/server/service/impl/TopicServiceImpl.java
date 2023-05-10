package com.example.server.service.impl;

import com.example.server.model.Topic;
import com.example.server.repository.TopicRepository;
import com.example.server.service.TopicService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TopicServiceImpl implements TopicService {
    private final TopicRepository topicRepository;

    @Override
    public Topic save(Topic topic) {
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

}
