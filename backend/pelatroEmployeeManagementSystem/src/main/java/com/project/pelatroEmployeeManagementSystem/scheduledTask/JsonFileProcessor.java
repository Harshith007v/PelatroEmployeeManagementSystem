package com.project.pelatroEmployeeManagementSystem.scheduledTask;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.pelatroEmployeeManagementSystem.serviceImp.HBaseServiceImp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

@Component
public class JsonFileProcessor {

    private static final Logger logger = LoggerFactory.getLogger(JsonFileProcessor.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final HBaseServiceImp hbaseService; // Inject your HBase service

    private static final String FOLDER_PATH = "EmployeeTimeLogFolder";

    public JsonFileProcessor(HBaseServiceImp hbaseService) {
        this.hbaseService = hbaseService;
    }

    @Scheduled(fixedRate = 300000) // Runs every 5 minutes
    public void processJsonFiles() {
    	
    	System.out.println("Scheduled task running here");
    	
    	
        logger.info("Starting scheduled task to process JSON files...");

        File folder = new File(FOLDER_PATH);

        if (!folder.exists() || !folder.isDirectory()) {
            logger.warn("Folder does not exist or is not a directory: {}", FOLDER_PATH);
            return;
        }

        File[] jsonFiles = folder.listFiles((dir, name) -> name.toLowerCase().endsWith(".json"));

        if (jsonFiles == null || jsonFiles.length == 0) {
            logger.info("No JSON files found in folder: {}", FOLDER_PATH);
            return;
        }

        for (File file : jsonFiles) {
            boolean saved = false;

            // Retry logic
            while (!saved) {
                try {
                    // Read JSON data from file
                    Map<String, Object> requestData = objectMapper.readValue(file, Map.class);

                    // Save to HBase using the provided method
                    String result = hbaseService.addEmployeeData(requestData);
                    logger.info("Result: {}", result);

                    // If successful, delete the file
                    Files.delete(file.toPath());
                    logger.info("Successfully processed and deleted file: {}", file.getName());
                    saved = true;

                } catch (IOException e) {
                    logger.error("Error processing file: {}. Retrying in the next cycle...", file.getName(), e);
                    break; // Exit loop for this cycle; retry in the next scheduled execution
                }
            }
        }
    }
}
