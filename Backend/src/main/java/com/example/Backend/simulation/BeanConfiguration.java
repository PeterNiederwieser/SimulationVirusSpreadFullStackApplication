package com.example.Backend.simulation;

import com.example.Backend.simulation.data.Context;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    @Bean
    public Context getContext() {
        return new Context();
    }
}
