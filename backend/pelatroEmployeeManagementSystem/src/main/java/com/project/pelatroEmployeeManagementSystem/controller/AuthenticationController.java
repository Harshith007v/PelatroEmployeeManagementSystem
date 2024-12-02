package com.project.pelatroEmployeeManagementSystem.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.pelatroEmployeeManagementSystem.dto.LoginDTO;
import com.project.pelatroEmployeeManagementSystem.dto.RegistrationDTO;
import com.project.pelatroEmployeeManagementSystem.service.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody RegistrationDTO body) {
        try {
            authenticationService.registerUser(body.getUserName(), body.getPassword());
            System.out.println(body);
            // Return a success response
            Map<String, String> response = new HashMap<>();
            response.put("message", "User registered successfully!");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            // Handle registration failure
            Map<String, String> response = new HashMap<>();
            response.put("error", "User registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginDTO body){
        String token = authenticationService.loginUser(body.getUserName(), body.getPassword());

        if (token.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid username or password.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }	
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    
} 