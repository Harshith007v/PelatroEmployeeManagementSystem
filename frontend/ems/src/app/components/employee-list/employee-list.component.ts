import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  searchText: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployeeList().subscribe(
      (data) => {
        this.employees = data;
        this.filteredEmployees = [...this.employees]; // Initially show all employees
        this.updatePaginatedEmployees();
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  onSearch(): void {
    if (this.searchText.trim() === '') {
      this.filteredEmployees = [...this.employees];
    } else {
      this.filteredEmployees = this.employees.filter((employee) =>
        employee.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        employee.emailId.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to first page when search is updated
    this.updatePaginatedEmployees();
  }

  updatePaginatedEmployees(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredEmployees.length) {
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
        });
        Swal.fire({
          title: "Deleted!",
          text: "Employee has been successfully deleted.",
          icon: "success"
        });
      }
    });
  }
}
