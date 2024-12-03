package com.project.pelatroEmployeeManagementSystem.service;

import java.io.IOException;
import java.util.Map;

public interface HBaseService {
	
	public boolean addEmployeeData(Map<String, Object> requestData) throws IOException;
	public Map<String, Object> getEmployeePerformance(String filePath) throws IOException;

}
