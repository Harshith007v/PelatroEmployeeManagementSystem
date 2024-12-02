package com.project.pelatroEmployeeManagementSystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="authentication")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name="user_name",length=255)
	private String userName;
	
	@Column(name="user_email",length=225)
	private String userEmail;
	
	@Column(name="password")
	private String password;
	
	public User() {
		
	}

	public User( Long id, String userName, String userEmail, String password ) {
		super();
		this.id = id;
		this.userName = userName;
		this.userEmail = userEmail;
		this.password = password;
	}

	
	public Long getId() {
		return id;
	}

	
	public void setId( Long id ) {
		this.id = id;
	}

	
	public String getUserName() {
		return userName;
	}

	
	public void setUserName( String userName ) {
		this.userName = userName;
	}

	
	public String getUserEmail() {
		return userEmail;
	}

	
	public void setUserEmail( String userEmail ) {
		this.userEmail = userEmail;
	}

	
	public String getPassword() {
		return password;
	}

	
	public void setPassword( String password ) {
		this.password = password;
	}
	
	
}
