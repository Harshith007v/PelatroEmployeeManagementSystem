package com.project.pelatroEmployeeManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pelatroEmployeeManagementSystem.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long>{

}
