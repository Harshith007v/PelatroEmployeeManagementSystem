import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service'; // Assume you have an Employee service
import { Employee } from '../../employee'; // Assume Employee model is defined
import { Department } from '../../department'; // Assume Department model is defined
import { DepartmentServiceService } from 'src/app/services/department-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {

  employee: Employee = {
    firstName: '',
    lastName: '',
    emailId: '',
    role: '',
    department: {} as Department,
    phone: '',
    joiningDate: '',
    id: 0,
    profilePicture: '',
    profilePicturePath: ''
  };
  departments: Department[] = []; // Store departments
  imageSrc: string | ArrayBuffer | null = 'assets/images/default_profile.jpg'; // Image preview

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentServiceService
  ) { }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id'); // Get employee id from URL
    if (employeeId) {
      const id = +employeeId;
      this.employeeService.getEmployeeById(id).subscribe((data) => {
        this.employee = data;
        this.imageSrc = this.employee.profilePicturePath || 'assets/images/default_profile.jpg';
      });
    }
    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  // Handle file selection
  onFileSelect(event: any): void {
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



  // // Submit the form to update the employee details
  // onSubmit(): void {
  //   if (this.employee.id) {
  //     // Correctly pass both employee ID and employee object to the updateEmployee method
  //     this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(
  //       (response) => {
  //         console.log('Employee updated successfully', response);
  //         this.router.navigate(['/employees']); // Redirect to employee list after update
  //       },
  //       (error) => {
  //         console.error('Error updating employee:', error);
  //       }
  //     );
  //   }
  // }

  // Close the form (navigate back)
  closeForm(): void {
    this.router.navigate(['/employees']);
  }

  // Clear form fields
  clearFields(): void {
    this.employee = {
      firstName: '',
      lastName: '',
      emailId: '',
      role: '',
      department: {} as Department,
      phone: '',
      joiningDate: '',
      id: 0,
      profilePicture: '',
      profilePicturePath: ''
    };
    this.imageSrc = null;
  }

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

    console.log('FormData contents:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.employeeService.updateEmployee(this.employee.id, formData).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/employees']);
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
