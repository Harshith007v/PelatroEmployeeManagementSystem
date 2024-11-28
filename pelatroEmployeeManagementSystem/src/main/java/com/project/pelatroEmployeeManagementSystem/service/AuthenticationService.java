package com.project.pelatroEmployeeManagementSystem.service;

import com.project.pelatroEmployeeManagementSystem.model.User;

public interface AuthenticationService {
	public User registerUser(User user);
	public User loginUser(User user);
}
