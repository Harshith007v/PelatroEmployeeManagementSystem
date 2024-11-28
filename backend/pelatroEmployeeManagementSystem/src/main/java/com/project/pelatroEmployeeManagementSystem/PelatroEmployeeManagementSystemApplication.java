package com.project.pelatroEmployeeManagementSystem;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.pelatroEmployeeManagementSystem.model.ApplicationUser;
import com.project.pelatroEmployeeManagementSystem.model.Role;
import com.project.pelatroEmployeeManagementSystem.repository.RoleRepository;
import com.project.pelatroEmployeeManagementSystem.repository.UserRepository;

@SpringBootApplication
public class PelatroEmployeeManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(PelatroEmployeeManagementSystemApplication.class, args);
	}
	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncode){
		return args ->{
			if(roleRepository.findByAuthority("ADMIN").isPresent()) return;
			Role adminRole = roleRepository.save(new Role("ADMIN"));
			roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);

			ApplicationUser admin = new ApplicationUser(null, "admin", passwordEncode.encode("password"), roles);

			userRepository.save(admin);
		};
	}

}
