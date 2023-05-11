package com.example.server.controller;

import com.example.server.model.Module;
import com.example.server.model.Topic;
import com.example.server.service.FileService;
import com.example.server.service.ModuleService;
import com.example.server.service.TopicService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TopicController {
    private final TopicService topicService;
    private final FileService fileService;
    private final ModuleService moduleService;

    @GetMapping("/topics")
    public ResponseEntity<Collection<Topic>> findAll() {
        return ResponseEntity.status(200).body(topicService.findAll());
    }

    @PostMapping("/topics")
    public ResponseEntity<Topic> post(@RequestParam("image") MultipartFile image,
                                      @RequestParam("title") String title,
                                      @RequestParam("file") MultipartFile filePdf,
                                      @RequestParam("moduleId") Long moduleId) throws Exception {
        String imageFilename = "";
        String filePdfFilename = "";
        try {
            imageFilename = fileService.createFile(image);
            filePdfFilename = fileService.createFile(filePdf);

            Topic topic = new Topic();
            topic.setTitle(title);
            topic.setImageUri(imageFilename);
            topic.setModule(moduleService.findById(moduleId)
                    .orElseThrow(() -> new Exception("Module not found")));
            topic.setFileUri(filePdfFilename);


            Topic savedTopic = topicService.save(topic);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedTopic);
        } catch (Exception e) {
            fileService.deleteFile(imageFilename);
            fileService.deleteFile(filePdfFilename);
            System.out.println(e.getMessage());
            return ResponseEntity.status(404).body(new Topic());
        }
    }

    @GetMapping("topics/find")
    public ResponseEntity<Topic> getByNumbers(@RequestParam Integer topicNumber,
                                              @RequestParam Integer moduleNumber) throws Exception {
        System.out.println(moduleNumber);
        System.out.println(topicNumber);
        return ResponseEntity
                .status(200)
                .body(topicService.findTopic(topicNumber, moduleNumber));
    }
}
