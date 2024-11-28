package com.project.pelatroEmployeeManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.pelatroEmployeeManagementSystem.apiResponseWrapper.ApiResponse;
import com.project.pelatroEmployeeManagementSystem.model.User;
import com.project.pelatroEmployeeManagementSystem.serviceImp.AuthenticationServiceImp;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class AuthenticationController {

	@Autowired
	private AuthenticationServiceImp authenticationServiceImp;
	
	@PostMapping("/register")
	public ResponseEntity<ApiResponse<Object>> registerUser(@RequestBody User user){
		try {
			User newUser=authenticationServiceImp.registerUser( user );
			ApiResponse<Object> response = new ApiResponse<>("pass",newUser);
			return ResponseEntity.ok( response );
		}catch (IllegalArgumentException ex) {
			//user exists
	        ApiResponse<Object> response = new ApiResponse<>("fail", null);
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); 
		}catch (Exception ex) {
	        ApiResponse<Object> response = new ApiResponse<>("fail", null);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);  
		}
		
	}

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<Object>> loginUser(@RequestBody User user){
		try {
	        User authenticatedUser = authenticationServiceImp.loginUser(user);
	        ApiResponse<Object> response = new ApiResponse<>("pass", authenticatedUser);
	        return ResponseEntity.ok(response);
	        
	    } catch (IllegalArgumentException ex) {
	        ApiResponse<Object> response = new ApiResponse<>("fail", "Invalid username or password");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	        
	    } catch (Exception ex) {
	        ApiResponse<Object> response = new ApiResponse<>("fail", "An unexpected error occurred");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}
	
	
}
