import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { DepartmentServiceService } from 'src/app/services/department-service.service';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  departments: any[] = [];
  employee: Employee = new Employee();
  clearFields(): void {
    this.employee = new Employee();
    this.imageSrc = '/assets/images/default_profile.jpg';
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach((field) => field.classList.remove('is-invalid'));
  }

  imageSrc: string | ArrayBuffer | null = '/assets/images/default_profile.jpg';

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentServiceService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Handle file input and display preview
  onFileSelect(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
    if (file) {
      this.employee.profilePicture = file; // Assign the file to the employee object
    }
  }

  // Handle form submission (e.g., save employee data)
  onSubmit() {
    console.log(this.employee);

    // Check if all required fields are filled
    if (
      !this.employee.firstName ||
      !this.employee.lastName ||
      !this.employee.emailId ||
      !this.employee.role ||
      !this.employee.department ||
      !this.employee.joiningDate ||
      !this.employee.phone
    ) {
      this.showValidationError();
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.employee.firstName);
    formData.append('lastName', this.employee.lastName);
    formData.append('emailId', this.employee.emailId);
    formData.append('joiningDate', this.employee.joiningDate);
    formData.append('phone', this.employee.phone);
    formData.append('role', this.employee.role);
    formData.append('departmentId', this.employee.department.id.toString()),
      formData.append(
        'departmentName',
        this.employee.department.departmentName
      ); // Assuming department is an object
    if (this.employee.profilePicture) {
      formData.append('profilePicture', this.employee.profilePicture); // Append the image file
    }


    this.employeeService.createEmployee(formData).subscribe((data) => {
      console.log(data);

      this.router.navigate(['/employees']).then(() => {
        // Force a page reload to refresh the component
        this.location.go(this.router.url);
        window.location.reload();
      });
    });
  }


  showValidationError() {
    if (!this.employee.firstName) {
      const firstNameField = document.getElementById(
        'firstName'
      ) as HTMLInputElement;
      firstNameField.placeholder = 'First Name is required';
      firstNameField.classList.add('is-invalid');
    }

    if (!this.employee.lastName) {
      const lastNameField = document.getElementById(
        'lastName'
      ) as HTMLInputElement;
      lastNameField.placeholder = 'Last Name is required';
      lastNameField.classList.add('is-invalid');
    }

    if (!this.employee.emailId) {
      const emailIdField = document.getElementById(
        'emailId'
      ) as HTMLInputElement;
      emailIdField.placeholder = 'Email Id is required';
      emailIdField.classList.add('is-invalid');
    }

    if (!this.employee.role) {
      const roleField = document.getElementById('role') as HTMLInputElement;
      roleField.placeholder = 'Role is required';
      roleField.classList.add('is-invalid');
    }

    if (!this.employee.department) {
      const departmentField = document.getElementById(
        'department'
      ) as HTMLSelectElement;
      departmentField.classList.add('is-invalid');
    }

    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please fill all the fields',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
