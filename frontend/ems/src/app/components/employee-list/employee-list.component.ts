import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  isAddEmployeeModalVisible = false; // Controls modal visibility
  employees: Employee[] = []; // Original list of employees
  filteredEmployees: Employee[] = []; // Filtered employees for search
  paginatedEmployees: Employee[] = []; // Employees to display in the current page
  currentPage: number = 1; // Tracks current page for pagination
  itemsPerPage: number = 8; // Employees per page
  searchText: string = ''; // Search query

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees(); // Fetch employee data on component initialization
  }

  /** Fetch all employees and populate lists */
  getEmployees(): void {
    this.employeeService.getEmployeeList().subscribe(
      (data) => {
        this.employees = data.map((employee) => ({
          ...employee,
          profilePictureUrl: employee.profilePicturePath
            ? `http://localhost:8080/api/photos?profilePicturePath=${encodeURIComponent(
                employee.profilePicturePath
              )}`
            : '/assets/images/default_profile.jpg',
        }));

        this.filteredEmployees = [...this.employees];
        this.updatePaginatedEmployees();
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  /** Handles search input */
  onSearch(): void {
    const query = this.searchText.trim().toLowerCase();

    this.filteredEmployees = query
      ? this.employees.filter(
          (employee) =>
            employee.firstName.toLowerCase().includes(query) ||
            employee.lastName.toLowerCase().includes(query) ||
            employee.emailId.toLowerCase().includes(query)
        )
      : [...this.employees];

    this.currentPage = 1; // Reset to the first page after search
    this.updatePaginatedEmployees();
  }

  /** Updates the list of employees for the current page */
  updatePaginatedEmployees(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees.slice(
      startIndex,
      endIndex
    );
  }

  /** Navigates to the next page */
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredEmployees.length) {
      this.currentPage++;
      this.updatePaginatedEmployees();
    }
  }

  /** Navigates to the previous page */
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEmployees();
    }
  }

  /** Opens the "Add Employee" modal */
  addEmployee(): void {
    this.isAddEmployeeModalVisible = true;
  }

  /** Closes the modal */
  closeModal(): void {
    this.isAddEmployeeModalVisible = false;
  }

  /** Navigates to view employee details */
  viewEmployee(id: number): void {
    this.router.navigate(['view-employee', id]);
  }

  /** Navigates to the update employee page */
  updateEmployee(id: number): void {
    this.router.navigate(['update-employees', id]);
  }

  /** Deletes an employee with confirmation */
  deleteEmployee(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'Employee has been successfully deleted.',
              'success'
            );
            this.getEmployees(); // Refresh the employee list
          },
          (error) => {
            console.error('Error deleting employee:', error);
            Swal.fire('Error', 'Unable to delete the employee.', 'error');
          }
        );
      }
    });
  }
}
