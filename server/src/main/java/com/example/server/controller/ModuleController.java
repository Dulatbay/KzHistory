package com.example.server.controller;

import com.example.server.model.Module;
import com.example.server.service.FileService;
import com.example.server.service.ModuleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
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

            return ResponseEntity.status(HttpStatus.CREATED).body(module);
        } catch (Exception e) {
            fileService.deleteFile(filename);
            throw e;
        }
    }

    @GetMapping("/modules")
    public ResponseEntity<Collection<Module>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(moduleService.findAll());
    }

    @GetMapping("/modules/{id}")
    public ResponseEntity<Module> findById(@PathVariable Long id) throws Exception {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(moduleService
                        .findById(id)
                        .orElseThrow(() -> new Exception("Module not found")));
    }
}


