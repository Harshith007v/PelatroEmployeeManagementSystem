import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/employee';


interface TopPerformer {
  empId: string;
  fullName: string; // Changed from name to fullName
  department: string;
  performance: number;
  profilePictureUrl: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  performanceData: any;
  developmentPerformance: number = 0;
  testingPerformance: number = 0;
  supportPerformance: number = 0;
  overallPerformance: number = 0;

  devEmployees: string[] = [];
  testEmployees: string[] = [];
  supportEmployees: string[] = [];
  topPerformers: string[] = [];
  topPerformanceValues: number[] = [];
  topPerformersDetails: TopPerformer[] = [];


  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    const filePath = '/home/pelatro/HdfsOutput/part-r-00000';
    this.employeeService.getPerformanceData(filePath).subscribe(
      (response: any) => {
        if (response.status === 'pass') {
          this.performanceData = response.body.employeePerformance;
          this.overallPerformance = response.body.overallPerformance;
          console.log(this.performanceData);

          this.calculateDepartmentPerformance();
        } else {
          console.error('Failed to fetch performance data');
        }
      },
      (error) => {
        console.error('Error fetching performance data:', error);
      }
    );
  }

  calculateDepartmentPerformance() {
    Object.keys(this.performanceData).forEach((empId) => {
      const id = parseInt(empId.replace('PEL', ''), 10);
      this.employeeService.getEmployeeById(id).subscribe(
        (data) => {
          const department = data.department.departmentName;
          if (department === 'Development') this.devEmployees.push(empId);
          else if (department === 'Testing') this.testEmployees.push(empId);
          else if (department === 'Support') this.supportEmployees.push(empId);

          this.updateDepartmentPerformance();
        },
        (error) => console.error('Error fetching employee data:', error)
      );
    });
  }

  updateDepartmentPerformance() {
    this.developmentPerformance = this.calculateAveragePerformance(this.devEmployees);
    this.testingPerformance = this.calculateAveragePerformance(this.testEmployees);
    this.supportPerformance = this.calculateAveragePerformance(this.supportEmployees);

    this.topPerformers = this.findTopPerformers();
    this.topPerformanceValues = this.topPerformers.map((empId) => this.performanceData[empId] || 0);

    const topPerformerIds = this.findTopPerformers();
    this.fetchTopPerformersDetails(topPerformerIds);

    this.createCharts();
  }

  calculateAveragePerformance(employeeArray: string[]): number {
    const totalPerformance = employeeArray.reduce((sum, empId) => {
      return sum + (this.performanceData[empId] || 0);
    }, 0);
    return employeeArray.length ? totalPerformance / employeeArray.length : 0;
  }

  findTopPerformers(): string[] {
    const sortedEmployees = Object.keys(this.performanceData).sort(
      (a, b) => this.performanceData[b] - this.performanceData[a]
    );
    return sortedEmployees.slice(0, 5); // Get top 5 performers
  }

  fetchTopPerformersDetails(topPerformerIds: string[]) {
    this.topPerformersDetails = []; // Reset before populating

    topPerformerIds.forEach((empId) => {
      console.log(topPerformerIds)
      const id = parseInt(empId.replace('PEL', ''), 10);
      this.employeeService.getEmployeeById(id).subscribe(
        (employeeData: Employee) => {
          const topPerformer: TopPerformer = {
            profilePictureUrl: employeeData.profilePicturePath
              ? `http://localhost:8080/api/photos?profilePicturePath=${encodeURIComponent(
                employeeData.profilePicturePath
              )}`
              : '/assets/images/default_profile.jpg',
            empId: employeeData.id.toString(),
            // Combine firstName and lastName
            fullName: `${employeeData.firstName} ${employeeData.lastName}`,
            department: employeeData.department.departmentName,
            performance: this.performanceData[empId]
          };
          this.topPerformersDetails.push(topPerformer);
        },
        (error) => console.error(`Error fetching details for ${empId}:`, error)
      );
    });
  }

  goToEmployee() {
    const employeeId = this.topPerformers[0].replace('PEL', '');
    this.router.navigate([`/view-employee/${employeeId}`]);
  }

  /** Navigates to view employee details */
  viewEmployee(id: number): void {
    this.router.navigate(['/view-employee', id]);
  }

  createCharts() {
    // Combined department-wise performance data
    const departmentPerformance = [
      {
        department: 'Development',
        performance: this.developmentPerformance
      },
      {
        department: 'Testing',
        performance: this.testingPerformance
      },
      {
        department: 'Support',
        performance: this.supportPerformance
      }
    ];

    // Department-wise Overall Performance Chart
    new Chart('departmentPerformanceChart', {
      type: 'bar',
      data: {
        labels: departmentPerformance.map((dept) => dept.department),
        datasets: [
          {
            label: 'Department Performance (%)',
            data: departmentPerformance.map((dept) => dept.performance),
            backgroundColor: [
              '#4CAF50', // Green for Development
              '#FFC107', // Yellow for Testing
              '#03A9F4', // Blue for Support
            ],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Department',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Performance (%)',
            },
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    // Top 5 Performers Bar Chart
    new Chart('topPerformersChart', {
      type: 'line',  // Change this to 'line' for a line chart
      data: {
        labels: this.topPerformers.map(empId => `PEL${empId.replace('PEL', '')}`), // Format the empId to PEL1, PEL2, etc.
        datasets: [
          {
            label: 'Employee Performance (%)',
            data: this.topPerformanceValues,
            borderColor: '#673AB7', // Purple for the line color
            fill: false,  // No fill under the line
            tension: 0.1, // Smooth curve for the line
            pointBackgroundColor: '#673AB7', // Color for the points on the line
            pointRadius: 5,  // Size of the points
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Employee IDs',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Performance (%)',
            },
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });


    // Overall Performance Chart
    new Chart('overallPerformanceChart', {
      type: 'bar',
      data: {
        labels: [...Object.keys(this.performanceData), 'Overall Performance'],
        datasets: [
          {
            label: 'Performance (%)',
            data: [
              ...Object.keys(this.performanceData).map((empId) => this.performanceData[empId]),
              this.overallPerformance,
            ],
            backgroundColor: [
              ...Object.keys(this.performanceData).map(() => '#4CAF50'), // Green for individual employees
              '#FFC107', // Yellow for overall performance
            ],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Employee ID / Overall Performance',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Performance (%)',
            },
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  }
}