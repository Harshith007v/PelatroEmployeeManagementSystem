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

  employees: Employee[] = [];
  searchText: any;

  paginatedEmployees: Employee[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployeeList().subscribe(
      (data) => {
        this.employees = data;
        this.updatePaginatedEmployees();
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  updatePaginatedEmployees(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.employees.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.employees.length) {
      this.currentPage++;
      this.updatePaginatedEmployees();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEmployees();
    }
  }

  viewEmployee(id: number) {
    this.router.navigate(['view-employee', id]);
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employees', id]);
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
          text: "Employee has been successfully deleted.",
          icon: "success"
        });
      }
    });
  }
}
