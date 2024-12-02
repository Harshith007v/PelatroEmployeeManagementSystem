package com.project.pelatroEmployeeManagementSystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.pelatroEmployeeManagementSystem.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	boolean existsByUserName(String userName);
    boolean existsByUserEmail(String userEmail);
    Optional<User> findByUserName(String userName);

	
}
