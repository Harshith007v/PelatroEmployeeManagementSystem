package com.project.pelatroEmployeeManagementSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.project.pelatroEmployeeManagementSystem.configuration.SecurityConfig;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class PelatroEmployeeManagementSystemApplication {

	public static void main(String[] args) { 
		
		
		SpringApplication.run(PelatroEmployeeManagementSystemApplication.class, args);
	}

}
