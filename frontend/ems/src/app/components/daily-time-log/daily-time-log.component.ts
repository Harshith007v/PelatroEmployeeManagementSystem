import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-daily-time-log',
  templateUrl: './daily-time-log.component.html',
  styleUrls: ['./daily-time-log.component.css'],
})
export class DailyTimeLogComponent implements OnInit {
  date: string; // Date for the time log
  timeLogs: any[] = []; // Holds rows for time log entries
  //validTimeLogs: any[] = [];
  totalHoursWorked: number = 0; // Total hours worked
  showDropdown: boolean = false; // Controls the visibility of the dropdown

  searchText: string = ''; // Search text for employee lookup
  employees: Employee[] = []; // List of all employees
  filteredEmployees: Employee[] = []; // Filtered list for search results
  selectedEmployee: Employee | null = null; // Selected employee

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initializeTimeLogs();
    this.getEmployees();

    // Set default date to current date
    const today = new Date();
    this.date = today.toISOString().split('T')[0];
  }

  // Fetch employees from the service
  private getEmployees() {
    this.employeeService.getEmployeeList().subscribe((data) => {
      this.employees = data;
      this.filteredEmployees = data; // Initially show all employees
    });
  }

  // Handle search input change
  onSearchChange() {
    if (this.searchText) {
      this.filteredEmployees = this.employees.filter(
        (employee) =>
          employee.firstName
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          employee.lastName
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          employee.emailId
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          employee.role.toLowerCase().includes(this.searchText.toLowerCase()) ||
          employee.department.departmentName
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          `PEL${employee.id}`
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
      );
      this.showDropdown = true;
    } else {
      this.filteredEmployees = this.employees;
      this.showDropdown = false;
    }
  }

  // Handle dropdown focus
  onFocus() {
    if (this.filteredEmployees.length > 0 && this.searchText) {
      this.showDropdown = true;
    }
  }

  // Handle dropdown blur
  onBlur() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); // Timeout to allow click event on dropdown items
  }

  // Select an employee from the dropdown
  selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.searchText = `PEL${employee.id} - ${employee.firstName} ${employee.lastName}`;
    this.showDropdown = false;
  }

  // Initialize the time log rows
  initializeTimeLogs() {
    this.timeLogs = [
      { startTime: '', endTime: '', project: '', totalHours: 0, points: 0 },
    ];
    this.calculateTotalHoursWorked(); // Update total hours
  }

  // Add a new time log row
  addRow() {
    if (!this.selectedEmployee) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please select an employee before adding working hours.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    this.timeLogs.push({
      startTime: '',
      endTime: '',
      project: '',
      totalHours: 0,
      points: 0,
    });
  }

  // Calculate hours worked for a specific row
  calculateRowHours(index: number) {
    const row = this.timeLogs[index];

    if (row.startTime && row.endTime) {
      const startTime = new Date(`1970-01-01T${row.startTime}:00`);
      const endTime = new Date(`1970-01-01T${row.endTime}:00`);

      if (endTime <= startTime) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'End Time must be after Start Time.',
          showConfirmButton: false,
          timer: 1500,
        });
        row.endTime = '';
        row.totalHours = 0;
        return;
      }

      const diffInMillis = endTime.getTime() - startTime.getTime();
      row.totalHours = parseFloat((diffInMillis / (1000 * 60 * 60)).toFixed(2)); // Convert ms to hours
    } else {
      row.totalHours = 0;
    }
    this.calculateTotalHoursWorked();
  }

  // Calculate total hours worked across all rows
  calculateTotalHoursWorked() {
    this.totalHoursWorked = this.timeLogs.reduce(
      (sum, row) => sum + (row.totalHours || 0),
      0
    );
  }

  submitForm() {
    if (!this.selectedEmployee) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please select an employee before submitting.',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Check if every row's fields (startTime, endTime, project) are empty
    const allRowsEmpty = this.timeLogs.every(
      (row) => !row.startTime && !row.endTime && !row.project
    );

    if (allRowsEmpty) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Working hours are empty. Do you still want to submit?',
        showCancelButton: true,
        confirmButtonText: 'Yes, Submit',
        cancelButtonText: 'No, Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.submitTimeLog();
        }
      });
      return;
    }

    const timeLogString = `emp_id:"PEL${this.selectedEmployee.id}",start_time:"${this.timeLogs[0].startTime}",end_time:"${this.timeLogs[0].endTime}",total_hours:"${this.timeLogs[0].totalHours}",project_name:"${this.timeLogs[0].project}",points:"${this.timeLogs[0].points}"`;

    console.log('Form submitted with data:', timeLogString);

    this.employeeService.addEmployeeTimeLog(timeLogString).subscribe(
      (response) => {
        // If the response is successful, show success message
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Time log for the employee has been successfully submitted.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.resetForm(); // Reset the form after submission
      },
      (error) => {
        // Handle any errors here
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'There was an error submitting the time log.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  // Handle the actual time log submission
  submitTimeLog() {
    console.log('Time log submitted');
  }

  // Reset the form
  resetForm() {
    this.searchText = '';
    this.selectedEmployee = null;
    this.initializeTimeLogs();
    this.date = new Date().toISOString().split('T')[0]; // Reset to current date
  }

  // Navigate back to the dashboard
  goBackToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
