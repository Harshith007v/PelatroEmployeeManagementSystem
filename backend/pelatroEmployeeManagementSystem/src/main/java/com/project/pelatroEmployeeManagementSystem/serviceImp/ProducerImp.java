	package com.project.pelatroEmployeeManagementSystem.serviceImp;

import java.io.*;
import java.nio.file.*;
import java.util.concurrent.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.scheduling.annotation.Scheduled;

public class ProducerImp {
	
	private static final int MAX_LOGS_PER_FILE = 5;
	private static final String LOG_DIR = "EmployeeTimeLogFolder";
	private static final long TIME_LIMIT = 20000L;
	
	private int logCount=0;
	private String currentFile;
	private long startTime;
    private final Lock lock = new ReentrantLock();
//	private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

	
    public ProducerImp() {
        ensureLogDirExists();
        this.currentFile = createNewLogFile();
        this.startTime = System.currentTimeMillis();
        
//		scheduler.scheduleAtFixedRate(this::checkAndFlushLogs, TIME_LIMIT, TIME_LIMIT, TimeUnit.MILLISECONDS);

    }

    private void ensureLogDirExists() {
        File dir = new File(LOG_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }
	
	private String createNewLogFile() {
		return LOG_DIR+"/file"+System.currentTimeMillis()+".json";
	}
	
	public void storeLogs(String logEntry) throws IOException{
		lock.lock();
		
		try {
			
			try(BufferedWriter writer= new BufferedWriter(new FileWriter(currentFile,true))){
				writer.write(logEntry+"\n");
				logCount++;
				
				if(logCount % MAX_LOGS_PER_FILE == 0) {
					completeCurrentFile();
				}
			}
			
			if (System.currentTimeMillis() - startTime >= TIME_LIMIT) {
	            flushLogsToNewFile();
	        }
			
		}finally {
			lock.unlock();
		}
		
	}
	
	private void completeCurrentFile() throws IOException {
		if (new File(currentFile).length() > 0) {
			String completedFile = currentFile.replace(".json", "_completed.json");
			Files.move(Paths.get(currentFile), Paths.get(completedFile));
			System.out.println("Renamed the file to: " + completedFile);
		}
		currentFile = createNewLogFile();
		logCount = 0; 
	}
	
	private void flushLogsToNewFile() throws IOException {
		lock.lock();
		try {
			completeCurrentFile();
			startTime = System.currentTimeMillis();
		} finally {
			lock.unlock();
		}
	}
	
	@Scheduled(fixedRate = TIME_LIMIT)
	private void checkAndFlushLogs() {
		try {
			if (System.currentTimeMillis() - startTime >= TIME_LIMIT) {
				flushLogsToNewFile();
			} 
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	

    

}