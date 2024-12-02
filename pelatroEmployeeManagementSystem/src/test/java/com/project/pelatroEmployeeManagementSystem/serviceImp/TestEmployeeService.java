package com.project.pelatroEmployeeManagementSystem.serviceImp;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.project.pelatroEmployeeManagementSystem.model.Department;
import com.project.pelatroEmployeeManagementSystem.model.Employee;
import com.project.pelatroEmployeeManagementSystem.repository.EmployeeRepository;
import com.project.pelatroEmployeeManagementSystem.service.EmployeeService;


class TestEmployeeService {

	@Mock
	private EmployeeRepository employeeRepository;
	
	@InjectMocks
	private EmployeeServiceImp employeeServiceImp;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks( this );
	}
	
	@Test
	void testGetAllEmployeesSuccess() {
		
		Department department1= new Department(101L,"Development");
		Department department2= new Department(102L,"Testing");
		
		Employee employee1= new Employee("harshith", "v","harshith@gmail.com", "Manager", department1);
		Employee employee2= new Employee("abc", "def","abc@gmail.com", "Tester", department2);
		
		List<Employee> mockEmployees = Arrays.asList( employee1, employee2 );
		
		when(employeeRepository.findAll()).thenReturn(mockEmployees);
		
		List<Employee> employees = employeeServiceImp.getAllEmployees();
		
		assertEquals(2,employees.size());
		assertEquals("harshith", employees.get(0).getFirstName()); 
		
	}

}
