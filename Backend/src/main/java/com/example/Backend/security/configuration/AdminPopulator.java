package com.example.Backend.security.configuration;

import com.example.Backend.security.data.User;
import com.example.Backend.security.data.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class AdminPopulator {
    @Bean
    ApplicationRunner populateAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@mail.com");
            admin.setPassword(passwordEncoder.encode("1234"));
            admin.setAuthorities(Set.of("ADMIN"));
            userRepository.save(admin);
        };
    }
}
