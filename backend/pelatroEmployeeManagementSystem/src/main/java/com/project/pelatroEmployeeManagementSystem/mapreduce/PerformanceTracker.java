package com.project.pelatroEmployeeManagementSystem.mapreduce;

import java.io.IOException;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.mapreduce.TableMapReduceUtil;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

public class PerformanceTracker {
	
	public void performaceDriver() throws IOException, ClassNotFoundException, InterruptedException {
		
		Configuration config= new Configuration();
		config.set( "fs.defaultFS", "hdfs://localhost:9000" );
		config.set("hbase.zookeeper.quorum", "localhost"); 
	    config.set("hbase.zookeeper.property.clientPort", "2181");
	    
        Path outputPath = new Path("hdfs://localhost:9000/user/hadoop/performance_output");
        Path localOutputPath = new Path("file:///home/pelatro/HdfsOutput");
        
        FileSystem fs = FileSystem.get(config);
        if (fs.exists(outputPath)) {
            fs.delete(outputPath, true);
            System.out.println("Existing output folder deleted.");
        }
        
        Job job= Job.getInstance( config, "Employee performance calculator" );
        
        job.setJarByClass( PerformanceTracker.class );
        
        TableMapReduceUtil.initTableMapperJob("employee",new Scan(), PerformanceMapper.class, Text.class, Text.class, job);
        
        job.setReducerClass( PerformanceReducer.class );
        
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);
        
        FileOutputFormat.setOutputPath( job, outputPath );
        
        boolean success = job.waitForCompletion(true);
        if (!success) {
            System.exit(1);
        }

        System.out.println("Job completed successfully.");
        
        FileSystem localFs = FileSystem.getLocal(config);
        if (localFs.exists(localOutputPath)) {
            localFs.delete(localOutputPath, true);
            System.out.println("Existing local output folder deleted.");
        }

        fs.copyToLocalFile(outputPath, localOutputPath);
        System.out.println("Output copied to local file system: " + localOutputPath);
        
	}
	
	
    public void scheduledPerformanceDriver() {
        try {
            performaceDriver();
        } catch (IOException | ClassNotFoundException | InterruptedException e) {
            e.printStackTrace();
            System.err.println("Error executing scheduled performance job: " + e.getMessage());
        }
    }
	
	
}
