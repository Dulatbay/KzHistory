package com.example.server.auth.config.init;

import com.example.server.auth.dto.RegistrationRequestDto;
import com.example.server.auth.service.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import static com.example.server.auth.model.user.Role.*;

@Component
@AllArgsConstructor
@Slf4j
public class UserInitializer implements CommandLineRunner {
    private AuthenticationService service;

    @Override
    public void run(String... args) throws Exception {
        try {
            log.debug("initializing users data");
            var admin = RegistrationRequestDto.builder()
                    .email("admin@mail.com")
                    .username("admin")
                    .password("password")
                    .role(ADMIN)
                    .build();
            System.out.println("Admin token: " + service.register(admin).getAccessToken());

            var manager = RegistrationRequestDto.builder()
                    .email("manager@mail.com")
                    .username("manager")
                    .password("password")
                    .role(MANAGER)
                    .build();
            System.out.println("Manager token: " + service.register(manager).getAccessToken());

            var user = RegistrationRequestDto.builder()
                    .email("user@mail.com")
                    .username("user")
                    .password("password")
                    .role(USER)
                    .build();
            System.out.println("User token: " + service.register(user).getAccessToken());


        } catch (Exception e) {
            log.debug(e.getMessage());
            throw e;
        }
    }
}
