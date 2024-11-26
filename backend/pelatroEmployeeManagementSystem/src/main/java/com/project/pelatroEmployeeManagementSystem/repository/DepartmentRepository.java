package com.project.pelatroEmployeeManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pelatroEmployeeManagementSystem.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long>{

}
