package com.project.pelatroEmployeeManagementSystem.serviceImp;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.*;
import java.nio.file.*;
import java.util.*;

public class ConsumerImp {
	
	private static final String LOG_DIR = "EmployeeTimeLogFolder";
    private static final long CHECK_INTERVAL = 10000L; 
    private static final String HBASE_TABLE = "employee";
    private static final String PROJECT_FAMILY = "project_details";
    private static final String TIME_FAMILY = "time_details";
    
    
    private Connection hbaseConnection;
    private Table hbaseTable;

    public ConsumerImp() {
        try {
            Configuration config = HBaseConfiguration.create();
            config.set("fs.defaultFS", "hdfs://localhost:9000");
            config.set("hbase.zookeeper.quorum", "localhost");
            config.set("hbase.zookeeper.property.clientPort", "2181");
            hbaseConnection = ConnectionFactory.createConnection(config);
            hbaseTable = hbaseConnection.getTable(TableName.valueOf(HBASE_TABLE));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    @Scheduled(fixedRate = CHECK_INTERVAL)
    public void checkAndProcessFiles() {
        File logDir = new File(LOG_DIR);
        if (logDir.exists() && logDir.isDirectory()) {
            File[] logFiles = logDir.listFiles((dir, name) -> name.endsWith("_completed.txt"));
            if (logFiles != null) {
                for (File file : logFiles) {
                    processFile(file);
                }
            }
        }
    }
    
    private void processFile(File file) {
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String logEntry;
            while ((logEntry = reader.readLine()) != null) {
                storeInHBase(logEntry);
            }
            Files.move(file.toPath(), Paths.get(file.getPath().replace(".txt", "_processed.txt")));
            System.out.println("Processed file: " + file.getName());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private void storeInHBase(String logEntry) {
    	
    	
    	Map<String,String> logData = new HashMap<>();
        String[] fields = logEntry.split(",");
        for(String field: fields) {
            String[] keyValue = field.split(":", 2); 

        	if(keyValue.length==2) {
                logData.put(keyValue[0].trim().replaceAll("\"", ""), keyValue[1].trim().replaceAll("\"", ""));
        	}
        }

        
        String empId = logData.get("emp_id");
        String startTime = logData.get("start_time");
        String endTime = logData.get("end_time");
        String totalHours = logData.get("total_hours");
        String projectName = logData.get("project_name");
        String points = logData.get("points");

        
        if (empId != null && startTime != null && endTime != null && totalHours != null && projectName != null && points != null) {

            long timestamp = System.currentTimeMillis();

            String rowKey = empId + "_" + timestamp;

            Put put = new Put(Bytes.toBytes(rowKey));

            put.addColumn(Bytes.toBytes(PROJECT_FAMILY), Bytes.toBytes("project_name"), Bytes.toBytes(projectName));
            put.addColumn(Bytes.toBytes(PROJECT_FAMILY), Bytes.toBytes("points"), Bytes.toBytes(points));

            put.addColumn(Bytes.toBytes(TIME_FAMILY), Bytes.toBytes("start_time"), Bytes.toBytes(startTime));
            put.addColumn(Bytes.toBytes(TIME_FAMILY), Bytes.toBytes("end_time"), Bytes.toBytes(endTime));
            put.addColumn(Bytes.toBytes(TIME_FAMILY), Bytes.toBytes("total_hours"), Bytes.toBytes(totalHours));

            try {
                hbaseTable.put(put);
                System.out.println("Inserted log entry for emp_id: " + empId);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    public void close() {
        try {
            if (hbaseTable != null) {
                hbaseTable.close();
            }
            if (hbaseConnection != null) {
                hbaseConnection.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    
}
