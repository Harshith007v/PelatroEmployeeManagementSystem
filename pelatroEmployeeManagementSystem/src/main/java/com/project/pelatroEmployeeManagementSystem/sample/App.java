package com.project.pelatroEmployeeManagementSystem.sample;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class App {
	
	private static final Logger logger = LogManager.getLogger(App.class);

	public static void main(String[] args) {

		logger.debug("This is a debug message");
        logger.info("This is an info message");
        logger.warn("This is a warn message");
        logger.error("This is an error message");
        logger.fatal("This is a fatal message");
		
	}

}
