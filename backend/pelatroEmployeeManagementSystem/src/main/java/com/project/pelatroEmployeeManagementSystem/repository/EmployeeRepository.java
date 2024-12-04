package com.project.pelatroEmployeeManagementSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pelatroEmployeeManagementSystem.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long>{
    List<Employee> findByIsActiveTrue(); 

}

