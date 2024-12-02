package com.project.pelatroEmployeeManagementSystem.service;

import java.io.IOException;
import java.util.Map;

public interface HBaseService {
	
	public String addEmployeeData(Map<String, Object> requestData) throws IOException;
	public Map<String, Double> getEmployeePerformance(String filePath) throws IOException;

}