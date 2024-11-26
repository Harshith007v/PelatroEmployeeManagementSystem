package com.project.pelatroEmployeeManagementSystem.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="departments")
public class Department {
	
	@Id
	@Column(name="id")
	private Long id;
	
	@Column(name="department_name")
	private String departmentName;

	public Department() {
		
	}
	
	public Department( Long id, String departmentName ) {
		super();
		this.id = id;
		this.departmentName = departmentName;
	}


	public Long getId() {
		return id;
	}

	
	public void setId( Long id ) {
		this.id = id;
	}

	
	public String getDepartmentName() {
		return departmentName;
	}

	
	public void setDepartmentName( String departmentName ) {
		this.departmentName = departmentName;
	}
	
	
	
	
	
}
