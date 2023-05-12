package com.example.server.service;

import com.example.server.auth.model.user.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    User save(User user) throws Exception;
    User patch(User user) throws Exception;
    User delete(Integer id) throws Exception;
    Optional<User> findById(Integer id);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
