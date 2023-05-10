package com.example.server.property;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@ConfigurationProperties(prefix = "file")
@Component
public class FileProperties {
    private String uploadDir;
}
