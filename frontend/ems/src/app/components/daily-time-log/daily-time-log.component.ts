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
  totalHoursWorked: number = 0; // Total hours worked
  showDropdown: boolean = false; // Controls the visibility of the dropdown

  searchText: string = ''; // Search text for employee lookup
  employees: Employee[] = []; // List of all employees
  filteredEmployees: Employee[] = []; // Filtered list for search results
  selectedEmployee: Employee | null = null; // Selected employee

  // Task data based on projects
  tasks = {
    'mviva-server': ['Server Task 1', 'Server Task 2', 'Server Task 3', 'Server Task 4'],
    'mviva-client': ['Client Task 1', 'Client Task 2', 'Client Task 3', 'Client Task 4'],
    'mviva-hadoop': ['Hadoop Task 1', 'Hadoop Task 2', 'Hadoop Task 3', 'Hadoop Task 4'],
  };

  // Points mapping for each task
  taskPoints = {
    'mviva-server': {
      'Server Task 1': 2.5,
      'Server Task 2': 5,
      'Server Task 3': 7.5,
      'Server Task 4': 10
    },
    'mviva-client': {
      'Client Task 1': 2.5,
      'Client Task 2': 5,
      'Client Task 3': 7.5,
      'Client Task 4': 10
    },
    'mviva-hadoop': {
      'Hadoop Task 1': 2.5,
      'Hadoop Task 2': 5,
      'Hadoop Task 3': 7.5,
      'Hadoop Task 4': 10
    },
  };

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.initializeTimeLogs();
    this.getEmployees();

    // Set default date to current date
    const today = new Date();
    this.date = today.toISOString().split('T')[0];
  }

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
      { startTime: '', endTime: '', project: '', task: '', totalHours: 0, points: 0 },
    ];
    this.calculateTotalHoursWorked(); // Update total hours
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

      const timeDiff = (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;
      row.totalHours = parseFloat(timeDiff.toFixed(2));

      // Assign points based on project and task
      if (row.project && row.task) {
        row.points = this.getTaskPoints(row.project, row.task);
      }
    }

    this.calculateTotalHoursWorked(); // Update total hours worked
  }

  // Calculate total hours worked across all rows
  calculateTotalHoursWorked() {
    this.totalHoursWorked = this.timeLogs.reduce(
      (acc, row) => acc + (row.totalHours || 0),
      0
    );
  }

  // Get points based on task selection
  getTaskPoints(project: string, task: string): number {
    if (this.taskPoints[project] && this.taskPoints[project][task] !== undefined) {
      return this.taskPoints[project][task];
    }
    return 0; // Default to 0 if no points are found for the task
  }


  // Handle form submission
  // submitForm() {
  //   if (!this.selectedEmployee) {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'error',
  //       title: 'Please select an employee.',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     return;
  //   }



  //   // Example: Handle submission logic here
  //   Swal.fire({
  //     position: 'center',
  //     icon: 'success',
  //     title: 'Form Submitted Successfully!',
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // }

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

    const timeLogString = `emp_id: "PEL${this.selectedEmployee.id}", start_time: "${this.timeLogs[0].startTime}", end_time: "${this.timeLogs[0].endTime}", total_hours: "${this.timeLogs[0].totalHours}", project_name: "${this.timeLogs[0].project}", points: "${this.timeLogs[0].points}"`;

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


  // Go back to the dashboard
  goBackToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // Update task options based on selected project
  onProjectChange(index: number) {
    const project = this.timeLogs[index].project;
    this.timeLogs[index].task = ''; // Reset task when project changes
    // Automatically calculate points when the project is changed and task is selected
    if (project && this.timeLogs[index].task && this.timeLogs[index].totalHours) {
      this.timeLogs[index].points = this.getTaskPoints(project, this.timeLogs[index].task);
    }
  }

  // Update points when task is selected
  onTaskChange(index: number) {
    const row = this.timeLogs[index];
    if (row.project && row.task) {
      row.points = this.getTaskPoints(row.project, row.task);
    }
  }



}


