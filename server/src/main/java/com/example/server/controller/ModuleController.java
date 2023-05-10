package com.example.server.controller;

import com.example.server.model.Module;
import com.example.server.service.FileService;
import com.example.server.service.ModuleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

@RestController
@AllArgsConstructor
public class ModuleController {
    private final FileService fileService;
    private final ModuleService moduleService;

    @PostMapping("/modules")
    public ResponseEntity<Module> post(@RequestParam("image") MultipartFile file,
                                               @RequestParam("title") String title) throws Exception {
        String filename = "";
        try {
            filename = fileService.createFile(file);

            Module module = new Module();
            module.setTitle(title);
            module.setImageUri(filename);

            moduleService.save(module);

            return ResponseEntity.status(200).body(module);
        } catch (Exception e) {
            fileService.deleteFile(filename);
            throw e;
        }
    }
    @GetMapping("/modules")
    public ResponseEntity<Collection<Module>> findAll(){
        return ResponseEntity.status(200).body(moduleService.findAll());
    }
}
