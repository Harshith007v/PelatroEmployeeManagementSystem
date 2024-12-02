package com.project.pelatroEmployeeManagementSystem.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.pelatroEmployeeManagementSystem.dto.LoginResponseDTO;
import com.project.pelatroEmployeeManagementSystem.model.ApplicationUser;
import com.project.pelatroEmployeeManagementSystem.model.Role;
import com.project.pelatroEmployeeManagementSystem.repository.RoleRepository;
import com.project.pelatroEmployeeManagementSystem.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private TokenService tokenService;


    public ApplicationUser registerUser(String username, String password) {
        try {
            // Check if the username already exists
//            if (userRepository.findByUsername(username)!=null) {
//                throw new IllegalArgumentException("Username already exists");
//            }

            // Encode the password
            String encodedPassword = passwordEncoder.encode(password);

            // Assign the "USER" role
            Role userRole = roleRepository.findByAuthority("USER").get();
            Set<Role> authorities = new HashSet<>();
            authorities.add(userRole);

            // Save the new user
            return userRepository.save(new ApplicationUser(null, username, encodedPassword, authorities));
        } catch (IllegalArgumentException e) {
            throw e; // Rethrow exception with a specific message
        } catch (Exception e) {
            // Handle other exceptions (e.g., database issues)
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    public String loginUser(String userName, String password){
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userName, password)
            );

            String token = tokenService.generateJwt(auth);

            return token;

        } catch (AuthenticationException e) {
            // Authentication failed, return an empty token or handle as needed
            return "";
        }
    }



}
