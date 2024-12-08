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

  showReport: boolean = true;

  // Toggles the display of the performance report
  toggleReport() {
    console.log("show report clicked")
    this.showReport = !this.showReport;
  }

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

  get profilePictureUrl(): string {
    return this.employee.profilePicturePath
      ? `http://localhost:8080/api/photos?profilePicturePath=${encodeURIComponent(this.employee.profilePicturePath)}`
      : '/assets/images/default_profile.jpg';
  }

  createPerformanceChart() {

    const employeeId = `PEL${this.id}`;

    if (this.performanceData && this.performanceData[employeeId] !== undefined) {
      const performanceScore = this.performanceData[employeeId];

      new Chart('performanceChart', {
        type: 'doughnut', // Doughnut chart for a gauge look
        data: {
          labels: ['Performance'],
          datasets: [{
            data: [performanceScore, 100 - performanceScore], // Show performance vs remaining
            backgroundColor: performanceScore >= 50 ? ['#4caf50', '#e0e0e0'] : ['#f44336', '#e0e0e0'], // Green for good performance, Red for low performance
            borderColor: '#fff',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          circumference: Math.PI,
          rotation: Math.PI,
          cutoutPercentage: 80, // To create a donut effect
          plugins: {
            legend: {
              display: false
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
      // Empty chart if no data found for the employee
      new Chart('performanceChart', {
        type: 'doughnut',
        data: {
          labels: ['No Data Available'],
          datasets: [{
            data: [100],  // Empty chart with no performance data
            backgroundColor: ['#e0e0e0'],
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
