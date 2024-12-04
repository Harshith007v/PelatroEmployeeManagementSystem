package com.project.pelatroEmployeeManagementSystem.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.project.pelatroEmployeeManagementSystem.serviceImp.ConsumerImp;

@Configuration
@EnableScheduling
public class ConsumerConfig {
    @Bean
    public ConsumerImp consumerImp() throws IOException {
        return new ConsumerImp();
    }
}
