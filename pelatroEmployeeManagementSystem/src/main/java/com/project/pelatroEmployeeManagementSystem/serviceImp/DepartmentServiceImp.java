package com.project.pelatroEmployeeManagementSystem.serviceImp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.pelatroEmployeeManagementSystem.model.Department;
import com.project.pelatroEmployeeManagementSystem.repository.DepartmentRepository;
import com.project.pelatroEmployeeManagementSystem.service.DepartmentService;

@Service
public class DepartmentServiceImp implements DepartmentService{
	
	@Autowired
	private DepartmentRepository departmentRepository;
	
	public List<Department> getAllDepartments(){
		return departmentRepository.findAll();
	}

}
