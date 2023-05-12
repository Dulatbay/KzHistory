package com.example.server.service.impl;

import com.example.server.auth.model.user.User;
import com.example.server.auth.repository.UserRepository;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceIml implements UserService {
    private final UserRepository userRepository;

    @Override
    public User save(User user) throws Exception {
        Optional<User> userFromDbOptional = userRepository.findByUsername(user.getUsername());

        if(userFromDbOptional.isPresent()) throw new Exception("User is already exist");

        user.setPassword((user.getPassword()));
        userRepository.save(user);

        return user;
    }

    @Override
    public User patch(User user) throws Exception {
        return userRepository.save(user);
    }

    @Override
    public User delete(Integer id) throws Exception {
        Optional<User> optionalUser = this.findById(id);

        if(optionalUser.isEmpty()) throw new Exception("User not found");

        userRepository.delete(optionalUser.get());

        return optionalUser.get();
    }

    @Override
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUserFromDb = this.findByUsername(username);

        if(optionalUserFromDb.isEmpty()) throw new UsernameNotFoundException("User not found");

        return optionalUserFromDb.get();
    }
}
