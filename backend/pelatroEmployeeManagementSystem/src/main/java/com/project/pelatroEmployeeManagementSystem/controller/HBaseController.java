package com.project.pelatroEmployeeManagementSystem.controller;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.Table;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.pelatroEmployeeManagementSystem.apiResponseWrapper.ApiResponse;
import com.project.pelatroEmployeeManagementSystem.serviceImp.HBaseServiceImp;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/workhours")
public class HBaseController {
	
	@Autowired
	private HBaseServiceImp hBaseServiceImp;
	
	@Value("${file.storage.path:~/Desktop/New Folder}")
    private String fileStoragePath;

    private AtomicBoolean isProcessing = new AtomicBoolean(false);

    @PostMapping("/addEmployeeData")
    public ResponseEntity<ApiResponse<String>> addEmployeeData(@RequestBody Map<String, Object> requestData) throws IOException {
        try {
            // Step 1: Save the incoming data to a local file
            String fileName = "employee_data_" + System.currentTimeMillis() + ".json";
            File file = new File(fileName);
            
            // Step 2: Write the data to the file
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(file, requestData);
            
            // Step 3: Read the data from the file and print it to the console
            Map<String, Object> readData = objectMapper.readValue(file, Map.class);
            System.out.println("Data read from file: " + readData);

            // Step 4: Return response
            ApiResponse<String> response = new ApiResponse<>("pass", "Data saved to file and read successfully.");
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            // Handle error
            ApiResponse<String> response = new ApiResponse<>("fail", "Error saving or reading data from file.");
            return ResponseEntity.status(500).body(response);
        }
    }
    
    @GetMapping("/performance")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getEmployeePerformance(@RequestParam(name = "filePath") String filePath) {
    	
        try {
        	
            Map<String, Object> employeePerformance = hBaseServiceImp.getEmployeePerformance(filePath);
            ApiResponse<Map<String, Object>> response = new ApiResponse<Map<String, Object>>( "pass", employeePerformance );
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            ApiResponse<Map<String, Object>> response = new ApiResponse<Map<String, Object>>( "fail", null );
            return ResponseEntity.status(500).body(response);
        }
    }

    
    

}
