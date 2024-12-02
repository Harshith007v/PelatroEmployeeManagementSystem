package com.project.pelatroEmployeeManagementSystem.apiResponseWrapper;


public class ApiResponse <T>{
	private String status;
	private T body;
	 
	public ApiResponse( String status, T body ) {
		super();
		this.status = status;
		this.body = body;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus( String status ) {
		this.status = status;
	}
	
	public T getBody() {
		return body;
	}
	
	public void setBody( T body ) {
		this.body = body;
	}
	
	
}
