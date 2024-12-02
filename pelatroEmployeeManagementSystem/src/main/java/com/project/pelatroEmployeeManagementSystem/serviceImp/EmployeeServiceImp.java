package com.project.pelatroEmployeeManagementSystem.serviceImp;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.pelatroEmployeeManagementSystem.exception.ResourceNotFoundException;
import com.project.pelatroEmployeeManagementSystem.model.Employee;
import com.project.pelatroEmployeeManagementSystem.repository.EmployeeRepository;
import com.project.pelatroEmployeeManagementSystem.service.EmployeeService;

@Service
public class EmployeeServiceImp implements EmployeeService{
	
	private EmployeeRepository employeeRepository;
	
	public EmployeeServiceImp(EmployeeRepository employeeRepository) {
		this.employeeRepository=employeeRepository;
	}
	
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	} 
	
	public Employee createEmployee(Employee employee) {
		return employeeRepository.save( employee );
	}
	
	public Employee getEmployeeById(Long id) {
		return employeeRepository.findById( id ).orElseThrow(()->new ResourceNotFoundException("No employee with id :"+id));
	}
	
	public Employee updateEmployee(Long id, Employee employee) {
		Employee newEmployee = employeeRepository.findById( id ).orElseThrow(()->new ResourceNotFoundException("No employee with id :"+id));
		
		newEmployee.setFirstName( employee.getFirstName() );
		newEmployee.setLastName( employee.getLastName() );
		newEmployee.setEmailId( employee.getEmailId() );
		newEmployee.setRole( employee.getRole() );
		newEmployee.setDepartment( employee.getDepartment() );
		
		Employee updatedEmployee=employeeRepository.save( newEmployee );
		
		return updatedEmployee;

	}
	
	public void deleteEmployee(Long id) {
		Employee employee = employeeRepository.findById( id ).orElseThrow(()->new ResourceNotFoundException("No employee with id :"+id));
		employeeRepository.delete( employee );	
	}
}
