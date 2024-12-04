package com.project.pelatroEmployeeManagementSystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.project.pelatroEmployeeManagementSystem.serviceImp.ProducerImp;

@Configuration
public class ProducerConfig {
    @Bean
    public ProducerImp producer() {
        return new ProducerImp();
    }
}