package com.project.pelatroEmployeeManagementSystem.serviceImp;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.Table;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.stereotype.Service;

import com.project.pelatroEmployeeManagementSystem.service.HBaseService;

@Service
public class HBaseServiceImp implements HBaseService {

    // Logger instance for this class
    private static final Logger logger = LogManager.getLogger(HBaseServiceImp.class);

    private static final String TABLE_NAME = "employee";
    private static final String CF_TIME_DETAILS = "time_details";
    private static final String CF_PROJECT_DETAILS = "project_details";

    private Connection hbaseConnection;

    public HBaseServiceImp() throws IOException {
        logger.info("Initializing HBaseServiceImp...");
        Configuration config = HBaseConfiguration.create();
        config.set("fs.defaultFS", "hdfs://localhost:9000");
        config.set("hbase.zookeeper.quorum", "localhost");
        config.set("hbase.zookeeper.property.clientPort", "2181");
        this.hbaseConnection = ConnectionFactory.createConnection(config);
        logger.info("HBase connection established.");
    }

    public boolean addEmployeeData(Map<String, Object> requestData) throws IOException {
        logger.info("Adding employee data...");

        String empId = (String) requestData.get("emp_id");
        if (empId == null || empId.isEmpty()) {
            logger.warn("Employee ID (emp_id) is missing in the request data.");
            return false;  // Return false if emp_id is missing
        }

        long currentTimeMillis = System.currentTimeMillis();
        String rowKey = empId + "_" + currentTimeMillis;  // Concatenate emp_id with timestamp

        try (Table table = hbaseConnection.getTable(TableName.valueOf(TABLE_NAME))) {
            Put put = new Put(Bytes.toBytes(rowKey));

            // Add emp_id to the HBase row
            put.addColumn(Bytes.toBytes(CF_PROJECT_DETAILS), Bytes.toBytes("emp_id"), Bytes.toBytes(empId));

            // Logging time details if available
            Map<String, String> timeDetails = (Map<String, String>) requestData.get("time_details");
            if (timeDetails != null) {
                logger.info("Adding time details for employee ID: {}", empId);
                timeDetails.forEach((key, value) -> put.addColumn(Bytes.toBytes(CF_TIME_DETAILS), Bytes.toBytes(key), Bytes.toBytes(value)));
            }

            // Logging project details if available
            Map<String, String> projectDetails = (Map<String, String>) requestData.get("project_details");
            if (projectDetails != null) {
                logger.info("Adding project details for employee ID: {}", empId);
                projectDetails.forEach((key, value) -> put.addColumn(Bytes.toBytes(CF_PROJECT_DETAILS), Bytes.toBytes(key), Bytes.toBytes(value)));
            }

            // Put the data into the HBase table
            table.put(put);
            logger.info("Employee data added successfully for row key: {}", rowKey);
            return true;  // Return true if the data is successfully saved
        } catch (IOException e) {
            logger.error("Error adding employee data for emp_id: {}", empId, e);
            return false;  // Return false if there is an error
        }
    }


    public Map<String, Object> getEmployeePerformance(String filePath) throws IOException {
        logger.info("Fetching employee performance data from file: {}", filePath);
        Map<String, Double> employeePerformance = new HashMap<>();
        String extractionDate = "";
        double overallPerformance = 0.0;

        File file = new File(filePath);
        if (!file.exists()) {
            logger.error("File not found at the specified path: {}", filePath);
            throw new IOException("File not found at the specified path: " + filePath);
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Assuming data format: emp_id Total Hours: value, Total Points: value, Performance: value, Extraction Date: value
                String[] parts = line.split(",");
                if (parts.length >= 3) {
                    if (line.contains("Overall Performance")) {
                        // Extract extraction date from the overall performance line
                        for (String part : parts) {
                            if (part.contains("Extraction Date")) {
                                extractionDate = part.split(":")[1].trim();
                            }

                            String overallPerformancePart = parts[2].split(":")[1].trim();
                            overallPerformance = Double.parseDouble(overallPerformancePart);
                        }
                    } else {
                        String empId = parts[0].split("\t")[0].trim();
                        String performancePart = parts[2].split(":")[1].trim();
                        double performance = Double.parseDouble(performancePart);
                        employeePerformance.put(empId, performance);
                    }
                }
            }
        } catch (IOException e) {
            logger.error("Error reading file from local file system: {}", filePath, e);
            throw new IOException("Error reading file from local file system", e);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("employeePerformance", employeePerformance);
        result.put("extractionDate", extractionDate); // Include extraction date in the result
        result.put("overallPerformance", overallPerformance);
        logger.info("Successfully fetched employee performance data.");
        return result;
    }
}
