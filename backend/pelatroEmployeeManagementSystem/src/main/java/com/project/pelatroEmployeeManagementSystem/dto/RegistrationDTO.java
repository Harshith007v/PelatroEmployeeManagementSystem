package com.project.pelatroEmployeeManagementSystem.dto;

public class RegistrationDTO {
    private String userName;
	private String password;
	private String userEmail;

	public RegistrationDTO(){
        super();
    }

    public RegistrationDTO(String userName, String userEmail, String password){
        super();
        this.userName = userName;
        this.userEmail = userEmail;
        this.password = password;
    }

    public String getUserName(){
        return this.userName;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }

    public String getUserEmail() {
		return userEmail;
	}

	public void setEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	
    public String getPassword(){
        return this.password;
    }

    public void setPassword(String password){
        this.password = password;
    }

    @Override
	public String toString() {
		return "RegistrationDTO [username=" + userName + ", password=" + password + ", email=" + userEmail + "]";
	}
}