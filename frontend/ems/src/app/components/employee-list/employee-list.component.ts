import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[];
  searchText: any;

  // employees = [
  //   {
  //     id: 1,
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     emailId: 'john.doe@example.com',
  //     department: { departmentName: 'HR' }
  //   },
  //   {
  //     id: 2,
  //     firstName: 'Jane',
  //     lastName: 'Smith',
  //     emailId: 'jane.smith@example.com',
  //     department: { departmentName: 'IT' }
  //   },
  //   {
  //     id: 3,
  //     firstName: 'Bob',
  //     lastName: 'Brown',
  //     emailId: 'bob.brown@example.com',
  //     department: { departmentName: 'Finance' }
  //   },
  //   {
  //     id: 3,
  //     firstName: 'Bob',
  //     lastName: 'Brown',
  //     emailId: 'bob.brown@example.com',
  //     department: { departmentName: 'Finance' }
  //   }, {
  //     id: 3,
  //     firstName: 'Bob',
  //     lastName: 'Brown',
  //     emailId: 'bob.brown@example.com',
  //     department: { departmentName: 'Finance' }
  //   }
  // ];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {

    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployeeList().subscribe(data => { this.employees = data; }, (error) => { console.error('Error fetching employees:', error); })
  }

  viewEmployee(id: number) {
    this.router.navigate(['view-employee', id])
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employees', id])
  }
  deleteEmployee(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe(data => {
          console.log(data);
          this.getEmployees();
        })
        Swal.fire({
          title: "Deleted!",
          text: "Employee has been successfully .",
          icon: "success"
        });
      }
    });

  }

}
