import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  id: number;
  employee: Employee = new Employee();
  performanceData: any;
  asOfDate: any;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // Fetch employee details
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    });

    // Fetch performance data and create chart
    const filePath = "/home/pelatro/HdfsOutput/part-r-00000";
    this.employeeService.getPerformanceData(filePath).subscribe(data => {
      this.performanceData = data.body.employeePerformance; // Assuming the data structure from the response
      this.asOfDate = data.body.extractionDate;
      this.createPerformanceChart();
    });
  }

  createPerformanceChart() {
    // Convert the employee ID from number to the string format (e.g., 'emp1', 'emp2', etc.)
    const employeeId = `emp${this.id}`;

    // If the performance data for the employee exists
    if (this.performanceData && this.performanceData[employeeId] !== undefined) {
      const performanceScore = this.performanceData[employeeId]; // Individual performance score

      new Chart('performanceChart', {
        type: 'pie',  // Using pie chart
        data: {
          labels: ['Employee Performance', 'Remaining'],  // Pie chart segments
          datasets: [{
            data: [performanceScore, 100 - performanceScore],  // Showing the individual performance vs remaining
            backgroundColor: ['#4caf50', '#e0e0e0'],  // Green for performance, gray for remaining
            borderColor: '#fff',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw;
                  return `${tooltipItem.label}: ${value}%`;  // Show percentage in tooltip
                }
              }
            }
          }
        }
      });
    } else {
      // Empty pie chart if no data found for the employee
      new Chart('performanceChart', {
        type: 'pie',
        data: {
          labels: ['No Data Available'],
          datasets: [{
            data: [100],  // Empty pie chart with no performance data
            backgroundColor: ['#e0e0e0'],  // Gray color indicating no data
            borderColor: '#fff',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              enabled: false  // Disable tooltip for empty chart
            }
          }
        }
      });
    }
  }

  backToEmployeeList() {
    this.router.navigate(['employees']);
  }
}
