package com.example.Backend.security.endpoint;

import com.example.Backend.security.data.RegistrationDTO;
import com.example.Backend.security.service.RegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("register")
public class RegisterEndpoint {
    private final RegisterService registerService;

    public RegisterEndpoint(RegisterService registerService) {
        this.registerService = registerService;
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegistrationDTO registration) {
        registerService.register(registration);
    }
}
