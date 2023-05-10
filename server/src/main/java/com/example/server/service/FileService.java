package com.example.server.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String createFile(MultipartFile file) throws Exception;

    void deleteFile(String filename);
}
