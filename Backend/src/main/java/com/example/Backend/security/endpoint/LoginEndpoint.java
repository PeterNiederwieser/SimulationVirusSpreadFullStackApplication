package com.example.Backend.security.endpoint;

import com.example.Backend.security.logic.JwtGenerator;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("login")
public class LoginEndpoint {
    private final JwtGenerator jwtGenerator;

    public LoginEndpoint(JwtGenerator jwtGenerator) {
        this.jwtGenerator = jwtGenerator;
    }

    @GetMapping
    public String jwt(Authentication authentication) {
        return jwtGenerator.generate(authentication);
    }
}
