import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

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
  topPerformer: string = '';
  topPerformanceValue: number = 0;

  devEmployees: string[] = [];
  testEmployees: string[] = [];
  supportEmployees: string[] = [];

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
    this.developmentPerformance = this.calculateAveragePerformance(
      this.devEmployees
    );
    this.testingPerformance = this.calculateAveragePerformance(
      this.testEmployees
    );
    this.supportPerformance = this.calculateAveragePerformance(
      this.supportEmployees
    );

    this.topPerformer = this.findTopPerformer();
    this.topPerformanceValue = this.performanceData[this.topPerformer] || 0;

    this.createCharts();
  }

  calculateAveragePerformance(employeeArray: string[]): number {
    const totalPerformance = employeeArray.reduce((sum, empId) => {
      return sum + (this.performanceData[empId] || 0);
    }, 0);
    return employeeArray.length ? totalPerformance / employeeArray.length : 0;
  }

  findTopPerformer(): string {
    return Object.keys(this.performanceData).reduce((top, empId) => {
      return this.performanceData[empId] > this.performanceData[top]
        ? empId
        : top;
    }, Object.keys(this.performanceData)[0]);
  }

  goToEmployee() {
    const employeeId = this.topPerformer.replace('PEL', '');
    this.router.navigate([`/view-employee/${employeeId}`]);
  }

  createCharts() {
    new Chart('devPerformanceChart', {
      type: 'pie',
      data: {
        labels: ['Completed', 'Remaining'],
        datasets: [
          {
            data: [this.developmentPerformance, 100 - this.developmentPerformance],
            backgroundColor: ['green', '#C5D3E8'], 
          },
        ],
      },
    });
  
    new Chart('testPerformanceChart', {
      type: 'pie',
      data: {
        labels: ['Completed', 'Remaining'],
        datasets: [
          {
            data: [this.testingPerformance, 100 - this.testingPerformance],
            backgroundColor: ['yellow', '#E5E3D4'], // Medium blue and lighter blue
          },
        ],
      },
    });
  
    new Chart('supportPerformanceChart', {
      type: 'pie',
      data: {
        labels: ['Completed', 'Remaining'],
        datasets: [
          {
            data: [this.supportPerformance, 100 - this.supportPerformance],
            backgroundColor: ['#DFD7F9', '#F8F4EC'], // Darker blue and medium-light blue
          },
        ],
      },
    });
  
    new Chart('topPerformerChart', {
      type: 'pie',
      data: {
        labels: [this.topPerformer, 'Others'],
        datasets: [
          {
            data: [this.topPerformanceValue, 100 - this.topPerformanceValue],
            backgroundColor: ['#D63484', '#C5D3E8'], // Deep blue and soft blue
          },
        ],
      },
    });
  
    new Chart('overallPerformanceChart', {
      type: 'bar',
      data: {
        labels: [...Object.keys(this.performanceData), 'Overall Performance'], // Employee IDs + Overall Performance label
        datasets: [
          {
            label: 'Employee Performance',
            data: [
              ...Object.keys(this.performanceData).map((empId) => this.performanceData[empId]),
              this.overallPerformance, // Overall performance for last bar
            ],
            backgroundColor: [

                '#4FFFB0', 
                 '#DFD7F9','#00A9FF', '#FF2929','#EFB6C8', '#A0E9FF', '#CDF5FD', '#37AFE1', '#4CC9FE', '#008DDA', '#41C9E2', // Shades of blue
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
              text: 'Employee ID / Overall',
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
