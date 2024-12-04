package com.project.pelatroEmployeeManagementSystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {

    @Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", emailId=" + emailId
				+ ", role=" + role + ", profilePicturePath=" + profilePicturePath + ", department=" + department + "]";
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="first_name", nullable = false)
    private String firstName;
    
    @Column(name="last_name", nullable = false)
    private String lastName;
    
    @Column(name="email_id", nullable = false)
    private String emailId;
    
    @Column(name="role", nullable = false) 
    private String role;
    
    @Column(name="profile_picture_path")
    private String profilePicturePath;

    public String getProfilePicturePath() {
		return profilePicturePath;
	}


	public void setProfilePicturePath(String profilePicturePath) {
		this.profilePicturePath = profilePicturePath;
	}

	@ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
    
    @Column(name = "is_active", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean isActive = true;
    
    public Employee() {
    	
    }

	
	public Employee( String firstName, String lastName, String emailId, String role, Department department ) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.role = role;
		this.department = department;
	}
	
	public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

	public Long getId() {
		return id;
	}

	
	public void setId( Long id ) {
		this.id = id;
	}

	
	public String getFirstName() {
		return firstName;
	}

	
	public void setFirstName( String firstName ) {
		this.firstName = firstName;
	}

	
	public String getLastName() {
		return lastName;
	}

	
	public void setLastName( String lastName ) {
		this.lastName = lastName;
	}

	
	public String getEmailId() {
		return emailId;
	}

	
	public void setEmailId( String emailId ) {
		this.emailId = emailId;
	}

	
	public String getRole() {
		return role;
	}

	
	public void setRole( String role ) {
		this.role = role;
	}

	
	public Department getDepartment() {
		return department;
	}

	
	public void setDepartment( Department department ) {
		this.department = department;
	}
	
    

}