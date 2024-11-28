package com.project.pelatroEmployeeManagementSystem.serviceImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.pelatroEmployeeManagementSystem.model.User;
import com.project.pelatroEmployeeManagementSystem.repository.UserRepository;
import com.project.pelatroEmployeeManagementSystem.service.AuthenticationService;

@Service
public class AuthenticationServiceImp implements AuthenticationService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User registerUser(User user) {
		
		if (userRepository.existsByUserName(user.getUserName())) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (userRepository.existsByUserEmail(user.getUserEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        
        return userRepository.save( user );
	}
	
	
	public User loginUser(User user) {
		User existingUser = userRepository.findByUserName(user.getUserName()).orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));
		
		if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }
		
		if (!existingUser.getUserName().equals(user.getUserName())) {
	        throw new IllegalArgumentException("Invalid username or password");
	    }
		
		return existingUser;
	}

}
