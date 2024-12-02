package com.project.pelatroEmployeeManagementSystem.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.pelatroEmployeeManagementSystem.model.Employee;


public interface EmployeeService {
	public List<Employee> getAllEmployees();
	public Employee createEmployee(Employee employee);
	public Employee getEmployeeById(Long id);
	public Employee updateEmployee(Long id, Employee employee);
	public void deleteEmployee(Long id);
}
