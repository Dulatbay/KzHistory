package com.example.server.auth.config.init;

import com.example.server.auth.dto.RegistrationRequestDto;
import com.example.server.auth.service.AuthenticationService;
import com.example.server.dto.NodeDto;
import com.example.server.dto.QuestionNodeDto;
import com.example.server.model.Module;
import com.example.server.model.Topic;
import com.example.server.service.ModuleService;
import com.example.server.service.TopicService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor
@Slf4j
public class UserInitializer implements CommandLineRunner {
    private AuthenticationService service;
    private TopicService topicService;
    private ModuleService moduleService;

    @Override
    public void run(String... args) throws Exception {
        try {
            log.debug("initializing users data");
            var admin = RegistrationRequestDto.builder()
                    .email("admin@mail.com")
                    .username("admin")
                    .password("password")
                    .build();
            System.out.println("Admin token: " + service.register(admin).getAccessToken());

            var manager = RegistrationRequestDto.builder()
                    .email("manager@mail.com")
                    .username("manager")
                    .password("password")
                    .build();
            System.out.println("Manager token: " + service.register(manager).getAccessToken());

            var user = RegistrationRequestDto.builder()
                    .email("user@mail.com")
                    .username("user")
                    .password("password")
                    .build();
            System.out.println("User token: " + service.register(user).getAccessToken());


        } catch (Exception e) {
            log.debug(e.getMessage());
            throw e;
        }

        // TODO: убрать это и перезаписать в другое место
        try {
            NodeDto root = NodeDto.builder()
                    .classNames("single-card fast-zoom")
                    .name("root")
                    .build();

            NodeDto content = NodeDto.builder()
                    .classNames("content-container cursor-able")
                    .name("content")
                    .build();

            QuestionNodeDto questionNodeDto = new QuestionNodeDto();
            questionNodeDto.setName("question");
            questionNodeDto.setClassNames("fast-question");

            content.setChildren(List.of(questionNodeDto));

            root.setChildren(List.of(content));

            Module module = new Module();
            module.setTitle("");
            module.setImageUri("");

            module = moduleService.save(module);


            Topic topic = new Topic();
            topic.setContent(root);
            topic.setTitle("TITLE");
            topic.setImageUri("image");
            topic.setModule(module);



            topicService.save(topic);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}
