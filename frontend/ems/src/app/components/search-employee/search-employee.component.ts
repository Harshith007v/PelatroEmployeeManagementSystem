import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {
  // searchText: string = ''; // Used to bind to the search input field
  // employees: Employee[] = []; // The full list of employees
  // filteredEmployees: Employee[] = []; // The list that will be displayed after filtering

  // constructor(private employeeService: EmployeeService) { }

  // ngOnInit(): void {
  //   this.getEmployees();
  // }

  // private getEmployees() {
  //   this.employeeService.getEmployeeList().subscribe(data => {
  //     this.employees = data;
  //     this.filteredEmployees = data;
  //   });
  // }

  // onSearchChange() {
  //   this.filteredEmployees = this.employees.filter(employee => {
  //     return (
  //       employee.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //       employee.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
  //       employee.emailId.toLowerCase().includes(this.searchText.toLowerCase())
  //     );
  //   });
  // }

  searchText: any;
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeeList().subscribe(data => { this.employees = data; })
  }


}
