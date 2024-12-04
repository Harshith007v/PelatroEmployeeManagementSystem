package com.project.pelatroEmployeeManagementSystem.serviceImp;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.project.pelatroEmployeeManagementSystem.exception.ResourceNotFoundException;
import com.project.pelatroEmployeeManagementSystem.model.Employee;
import com.project.pelatroEmployeeManagementSystem.repository.EmployeeRepository;
import com.project.pelatroEmployeeManagementSystem.service.EmployeeService;

@Service
public class EmployeeServiceImp implements EmployeeService {
    
    private static final Logger logger = LogManager.getLogger(EmployeeServiceImp.class);
	
    private EmployeeRepository employeeRepository;
	
    public EmployeeServiceImp(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
        logger.info("EmployeeServiceImp initialized with EmployeeRepository");
    }
	
    public List<Employee> getAllEmployees() {
        logger.debug("Fetching all employees");
        List<Employee> employees = employeeRepository.findByIsActiveTrue();
        logger.info("Retrieved {} employees", employees.size());
        return employees;
    } 
	
    public Employee createEmployee(Employee employee) {
        try {
            logger.debug("Attempting to create new employee: {}", employee);
            Employee savedEmployee = employeeRepository.save(employee);
            logger.info("Employee created successfully with ID: {}", savedEmployee.getId());
            return savedEmployee;
        } catch (Exception e) {
            logger.error("Error creating employee: {}", e.getMessage(), e);
            throw e;
        }
    }
	
    public Employee getEmployeeById(Long id) {
        try {
            logger.debug("Fetching employee with ID: {}", id);
            Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Employee not found with ID: {}", id);
                    return new ResourceNotFoundException("No employee with id: " + id);
                });
            logger.info("Retrieved employee with ID: {}", id);
            return employee;
        } catch (ResourceNotFoundException e) {
            logger.warn("Attempt to retrieve non-existent employee with ID: {}", id);
            throw e;
        }
    }
	
    public Employee updateEmployee(Long id, Employee employee) {
        try {
            logger.debug("Attempting to update employee with ID: {}", id);
            
            Employee newEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Employee not found for update with ID: {}", id);
                    return new ResourceNotFoundException("No employee with id: " + id);
                });
		
            newEmployee.setFirstName(employee.getFirstName());
            newEmployee.setLastName(employee.getLastName());
            newEmployee.setEmailId(employee.getEmailId());
            newEmployee.setRole(employee.getRole());
            newEmployee.setDepartment(employee.getDepartment());
		
            Employee updatedEmployee = employeeRepository.save(newEmployee);
            
            logger.info("Employee updated successfully with ID: {}", id);
            return updatedEmployee;
        } catch (Exception e) {
            logger.error("Error updating employee with ID: {}", id, e);
            throw e;
        }
    }
	
    public void deleteEmployee(Long id) {
        try {
            logger.debug("Attempting to delete employee with ID: {}", id);
            
            Optional<Employee> employee = employeeRepository.findById(id);
            
            if (employee.isPresent()) {
                Employee emp = employee.get();
                emp.setActive(false); 
                employeeRepository.save(emp); 
            }
            
            logger.info("Employee deleted successfully with ID: {}", id);
        } catch (Exception e) {
            logger.error("Error deleting employee with ID: {}", id, e);
            throw e;
        }
    }
}
