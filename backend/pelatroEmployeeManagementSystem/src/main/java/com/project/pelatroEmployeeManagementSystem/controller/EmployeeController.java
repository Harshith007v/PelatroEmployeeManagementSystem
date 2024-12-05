package com.project.pelatroEmployeeManagementSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.pelatroEmployeeManagementSystem.apiResponseWrapper.ApiResponse;
import com.project.pelatroEmployeeManagementSystem.model.Department;
import com.project.pelatroEmployeeManagementSystem.model.Employee;
import com.project.pelatroEmployeeManagementSystem.serviceImp.EmployeeServiceImp;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api")
public class EmployeeController {
	
	@Autowired
	private EmployeeServiceImp employeeServiceImp;
	
	public EmployeeController(EmployeeServiceImp employeeServiceImp) {
		this.employeeServiceImp=employeeServiceImp;
	}
	
	@GetMapping("/employees")
	public ResponseEntity<ApiResponse<List<Employee>>> getAllEmployees(){
		try {
			
			List<Employee> employees = employeeServiceImp.getAllEmployees() ;
			ApiResponse<List<Employee>> response = new ApiResponse<>("pass", employees);
			return ResponseEntity.ok( response );
		}catch(Exception e) {
			ApiResponse<List<Employee>> response = new ApiResponse<>("fail", null);
			return ResponseEntity.status( 500 ).body( response );
		}
		
	}
	
		@PostMapping("/employees")
		public ResponseEntity<ApiResponse<Employee>> createEmployee
		(
				@RequestParam("firstName") String firstName,
	            @RequestParam("lastName") String lastName,
	            @RequestParam("emailId") String emailId,
	            @RequestParam("role") String role,
	            @RequestParam("departmentId") String departmentId,
	            @RequestParam("departmentName") String departmentName,
	            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture
	    )
		{
			try 
			{
				Department department = new Department(Long.parseLong(departmentId),departmentName);
				Employee employee = new Employee();
				employee.setFirstName(firstName);
				employee.setLastName(lastName);
				employee.setEmailId(emailId);
				employee.setRole(role);
				employee.setDepartment(department);
				
				System.out.println(employee);
			
			
				ApiResponse<Employee> response = new ApiResponse<>("pass",employeeServiceImp.createEmployee( employee,profilePicture ));
				return ResponseEntity.ok( response );
			}
			catch(Exception e) 
			{
				System.out.println(e.getMessage());
				ApiResponse<Employee> response = new ApiResponse<>("fail", null);
				return ResponseEntity.status( 500 ).body( response );
			}
	}
	
	
	//to get emp by id
	@GetMapping("/employees/{id}")
	public ResponseEntity<ApiResponse<Employee>> getEmployeeById(@PathVariable("id") Long id){
		try {
			Employee employee=employeeServiceImp.getEmployeeById( id );
			ApiResponse<Employee> response = new ApiResponse<>("pass",employee);
			return ResponseEntity.ok( response );
		}catch(Exception e) {
			ApiResponse<Employee> response = new ApiResponse<>("fail", null);
			return ResponseEntity.status( 500 ).body( response );
		}
	}
	 
	//update emp
	@PutMapping("/employees/{id}")
	public ResponseEntity<ApiResponse<Employee>> updateEmployee(@PathVariable("id") Long id, @RequestBody Employee employee){
		try {
			Employee updatedEmployee=employeeServiceImp.updateEmployee( id, employee );
			ApiResponse<Employee> response= new ApiResponse<>("pass",updatedEmployee);
			return ResponseEntity.ok( response );
		}catch(Exception e) {
			ApiResponse<Employee> response = new ApiResponse<>("fail", null);
			return ResponseEntity.status( 500 ).body( response );
		}
	}
	
		@DeleteMapping("/employees/{id}")
		public ResponseEntity<ApiResponse<String>> deleteEmployee(@PathVariable("id") Long id){
			try {
				employeeServiceImp.deleteEmployee( id );
				
				ApiResponse<String> response = new ApiResponse<>("pass","Employee deleted from database");
				return ResponseEntity.ok( response );
			}catch(Exception e) {
				ApiResponse<String> response = new ApiResponse<>("fail", null);
				return ResponseEntity.status( 500 ).body( response );
			}
		}

}

