import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { DepartmentServiceService } from 'src/app/services/department-service.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee = new Employee();
  departments: any[] = [];
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      console.log(this.employee)
    }, error => console.log(error));

    this.getDepartments();

  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(data => { this.departments = data }, error => {
      console.error('There was an error!', error);
    })
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      response => {
        console.log('Employee updated successfully', response);
        this.router.navigate(['/employees']);
      },
      error => {
        console.log('Error updating employee', error);
      }
    );
  }

  onSubmit(): void {
    this.updateEmployee();
  }

  backToEmployeeList() {
    this.router.navigate(['employees']);
  }


}
