package com.example.Backend.security.logic;

import com.example.Backend.security.data.RegistrationDTO;
import com.example.Backend.security.data.User;
import com.example.Backend.security.data.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegistrationDTO registration) {
        String encodedPassword = passwordEncoder.encode(registration.password());
        User user = new User();
        user.setUsername(registration.userName());
        user.setEmail(registration.email());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }
}
