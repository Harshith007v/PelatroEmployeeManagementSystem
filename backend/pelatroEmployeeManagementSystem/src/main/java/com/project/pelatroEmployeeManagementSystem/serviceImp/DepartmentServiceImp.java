package com.project.pelatroEmployeeManagementSystem.serviceImp;

import java.util.List;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.pelatroEmployeeManagementSystem.model.Department;
import com.project.pelatroEmployeeManagementSystem.repository.DepartmentRepository;
import com.project.pelatroEmployeeManagementSystem.service.DepartmentService;

@Service
public class DepartmentServiceImp implements DepartmentService {

    // Create a Logger instance
    private static final Logger logger = LogManager.getLogger(DepartmentServiceImp.class);

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public List<Department> getAllDepartments() {
        logger.info("Fetching all departments...");  // Log the action

        List<Department> departments = departmentRepository.findAll();

        if (departments.isEmpty()) {
            logger.warn("No departments found.");  // Log a warning if no departments are found
        } else {
            logger.info("Successfully fetched {} departments.", departments.size());  // Log success with the number of departments found
        }

        return departments;
    }
}
