package com.project.pelatroEmployeeManagementSystem.serviceImp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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
import org.springframework.stereotype.Service;

import com.project.pelatroEmployeeManagementSystem.service.HBaseService;

@Service
public class HBaseServiceImp implements HBaseService{
	
	private static final String TABLE_NAME = "employee";
    private static final String CF_TIME_DETAILS = "time_details";
    private static final String CF_PROJECT_DETAILS = "project_details";
    
    private  Connection hbaseConnection;
    
    public HBaseServiceImp() throws IOException {
    	
    	Configuration config = HBaseConfiguration.create();
    	config.set( "fs.defaultFS", "hdfs://localhost:9000" );
    	config.set("hbase.zookeeper.quorum", "localhost");
        config.set("hbase.zookeeper.property.clientPort", "2181");
        this.hbaseConnection = ConnectionFactory.createConnection(config);
    }
	
	public String addEmployeeData(Map<String, Object> requestData) throws IOException{
		
		try (Table table = hbaseConnection.getTable(TableName.valueOf(TABLE_NAME))) {
			
	        String empId = (String) requestData.get("emp_id");
	        if (empId == null || empId.isEmpty()) {
	            return "Employee ID (emp_id) is required.";
	        }

	        long currentTimeMillis = System.currentTimeMillis();
	        String rowKey = empId + "_" + currentTimeMillis;  // Concatenate emp_id with timestamp
	        
	        Put put = new Put(Bytes.toBytes(rowKey));

	        put.addColumn(Bytes.toBytes(CF_PROJECT_DETAILS), Bytes.toBytes("emp_id"), Bytes.toBytes(empId));
            
            Map<String, String> timeDetails = (Map<String, String>) requestData.get("time_details");
            if (timeDetails != null) {
                timeDetails.forEach((key, value) -> 
                    put.addColumn(Bytes.toBytes(CF_TIME_DETAILS), Bytes.toBytes(key), Bytes.toBytes(value))
                );
            }
            
            Map<String, String> projectDetails = (Map<String, String>) requestData.get("project_details");
            if (projectDetails != null) {
                projectDetails.forEach((key, value) -> 
                    put.addColumn(Bytes.toBytes(CF_PROJECT_DETAILS), Bytes.toBytes(key), Bytes.toBytes(value))
                );
            }
            
            table.put(put);
            return "Employee data added successfully for row key: " + rowKey;
        }
		
	}
	
	public Map<String, Double> getEmployeePerformance(String filePath) throws IOException {
        Map<String, Double> employeePerformance = new HashMap<>();
 
        Configuration hadoopConfig = new Configuration();
        hadoopConfig.set("fs.defaultFS", "hdfs://localhost:9000");
        FileSystem fs = FileSystem.get(hadoopConfig);

        Path path = new Path(filePath);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(fs.open(path)))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Assuming data format: emp_id Total Hours: value, Total Points: value, Performance: value
                String[] parts = line.split(",");
                if (parts.length == 3) {
                    String empId = parts[0].split("\t")[0].trim();  
                    String performancePart = parts[2].split(":")[1].trim(); 
                    double performance = Double.parseDouble(performancePart);
                    employeePerformance.put(empId, performance);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new IOException("Error reading file from HDFS", e);
        }

        return employeePerformance;
    }
	

}
