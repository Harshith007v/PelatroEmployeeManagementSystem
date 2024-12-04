package com.project.pelatroEmployeeManagementSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.pelatroEmployeeManagementSystem.apiResponseWrapper.ApiResponse;
import com.project.pelatroEmployeeManagementSystem.model.Employee;
import com.project.pelatroEmployeeManagementSystem.serviceImp.ProducerImp;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/logs")
public class ProducerController {

    @Autowired
    private ProducerImp producer;

    @PostMapping
    public ResponseEntity<ApiResponse<String>>  receiveLog(@RequestBody String logEntry) {
        try {
            producer.storeLogs(logEntry); // Store JSON log directly
            ApiResponse<String> response = new ApiResponse<>("pass", "Employee log stored successfull");
            return ResponseEntity.ok(response);
            } catch (IOException e) {
            	ApiResponse<String> response = new ApiResponse<>("fail", null);
    			return ResponseEntity.status( 500 ).body( response );
        }
    }
    
   
	
}
