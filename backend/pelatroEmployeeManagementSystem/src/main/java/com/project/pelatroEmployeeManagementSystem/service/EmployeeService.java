package com.project.pelatroEmployeeManagementSystem.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.project.pelatroEmployeeManagementSystem.model.Employee;


public interface EmployeeService {
	public List<Employee> getAllEmployees();
	public Employee createEmployee(Employee employee,MultipartFile profilePhoto) throws Exception;
	public Employee getEmployeeById(Long id);
	public Employee updateEmployee(Long id, Employee employee,MultipartFile profilePicture) throws Exception;
	public void deleteEmployee(Long id);
}