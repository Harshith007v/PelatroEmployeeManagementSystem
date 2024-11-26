package com.project.pelatroEmployeeManagementSystem.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.pelatroEmployeeManagementSystem.apiResponseWrapper.ApiResponse;
import com.project.pelatroEmployeeManagementSystem.model.Department;
import com.project.pelatroEmployeeManagementSystem.serviceImp.DepartmentServiceImp;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class DepartmentController {
	
	@Autowired
	private DepartmentServiceImp departmentServiceImp;
	
	@GetMapping("/departments")
	public ResponseEntity<ApiResponse<List<Department>>> getAllDepartments(){
		try {
			List<Department> departments = departmentServiceImp.getAllDepartments();
			ApiResponse<List<Department>> response = new ApiResponse<>("pass", departments); 
			return ResponseEntity.ok( response );
		}catch(Exception e) {
			ApiResponse<List<Department>> response = new ApiResponse<>("fail", null);
			return ResponseEntity.status( 500 ).body( response );
		}
	}

}
