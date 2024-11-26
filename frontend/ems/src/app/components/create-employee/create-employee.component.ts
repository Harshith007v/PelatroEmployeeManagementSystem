import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { DepartmentServiceService } from '../../services/department-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  departments: any[] = [];

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(data => { this.departments = data }, error => {
      console.error('There was an error!', error);
    })
  }

  onSubmit() {
    console.log(this.employee);
    this.employeeService.createEmployee(this.employee).subscribe(data => {
      console.log(data);
      this.router.navigate(['/employees'])
    }, error => {
      console.error('There was an error!', error);

      if (!this.employee.firstName) {
        const firstNameField = document.getElementById('firstName') as HTMLInputElement;
        firstNameField.placeholder = 'First Name is required';
        firstNameField.classList.add('is-invalid');
      }

      if (!this.employee.lastName) {
        const lastNameField = document.getElementById('lastName') as HTMLInputElement;
        lastNameField.placeholder = 'Last Name is required';
        lastNameField.classList.add('is-invalid');
      }
      if (!this.employee.emailId) {
        const emailIdField = document.getElementById('emailId') as HTMLInputElement;
        emailIdField.placeholder = 'Email Id is required';
        emailIdField.classList.add('is-invalid');
      }
      if (!this.employee.role) {
        const roleField = document.getElementById('role') as HTMLInputElement;
        roleField.placeholder = 'Role is required';
        roleField.classList.add('is-invalid');
      }
      if (!this.employee.department) {
        const departmentField = document.getElementById('department') as HTMLSelectElement;
        departmentField.classList.add('is-invalid');
      }
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Please fill all the fields",
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

}
