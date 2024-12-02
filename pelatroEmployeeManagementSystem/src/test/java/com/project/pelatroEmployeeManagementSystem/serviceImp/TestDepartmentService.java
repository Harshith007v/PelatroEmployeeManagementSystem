package com.project.pelatroEmployeeManagementSystem.serviceImp;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import java.util.*;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.project.pelatroEmployeeManagementSystem.model.Department;
import com.project.pelatroEmployeeManagementSystem.repository.DepartmentRepository;

@ExtendWith(MockitoExtension.class)
class TestDepartmentService {
	 
	@Mock
	private DepartmentRepository departmentRepository;
	
	@InjectMocks
	private DepartmentServiceImp departmentServiceImp;

	@Test
	public void testGetAllDepartments_Success() {
		
		Department department1= new Department(104L,"HR");
		Department department2= new Department(105L,"Engineering");
		
		List<Department> departments = Arrays.asList( department1, department2 );
		
		when(departmentRepository.findAll()).thenReturn(departments);
		
        List<Department> result = departmentServiceImp.getAllDepartments();
        
        assertEquals(2, result.size());
        assertEquals("HR", result.get(0).getDepartmentName());
        
	} 
	
	@Test
	public void testGetAllDepartments_Failure() {
		
		when(departmentRepository.findAll()).thenThrow(new RuntimeException("Database error"));

		assertThrows(RuntimeException.class, () -> {
			departmentServiceImp.getAllDepartments();
		});

	}
	 
	

}
