package com.example.server.service.impl;

import com.example.server.exceptions.FileStorageException;
import com.example.server.property.FileProperties;
import com.example.server.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

@Service
public class FileServiceImpl implements FileService {

    private final Path fileStorageLocation;

    @Autowired
    public FileServiceImpl(FileProperties fileProperties) {
        this.fileStorageLocation = Path.of(fileProperties.getUploadDir())
                .toAbsolutePath()
                .normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception e) {
            System.out.println("Could not create the directory where the uploaded files will be stored.");
        }
    }

    @Override
    public String createFile(MultipartFile file) throws Exception {
        String filename = file.getOriginalFilename();
        if (filename == null) throw new Exception("Filename is null");
        try {
            if (filename.contains("..")) {
                throw new FileStorageException("Filename contains invalid path sequence" + filename);
            }

            filename = LocalDateTime
                    .now()
                    .toString()
                    .replace(":", "_") + "_" + filename;

            Path targetLocation = this.fileStorageLocation.resolve(filename);

            Files.copy(file.getInputStream(),
                    targetLocation,
                    StandardCopyOption.REPLACE_EXISTING);

            return filename;
        } catch (Exception e) {
            throw new FileStorageException("Could not store file " + filename + ". Please try again!", e);
        }
    }

    @Override
    public void deleteFile(String filename) {
        try {
            if (filename.isEmpty()) throw new Exception();
            Files.delete(Path.of(filename));
        } catch (Exception e) {
            System.out.println("Unsuccessful delete file");
        }
    }
}
