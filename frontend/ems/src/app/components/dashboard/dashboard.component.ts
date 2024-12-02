import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service'; // Importing employee service

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  performanceData: any;
  developmentPerformance: number = 0;
  topPerformer: string = '';
  topPerformance: number = 0;
  overallPerformance: number = 0;
  topPerformerDetails: any = {};

  constructor(
    private router: Router,
    private employeeService: EmployeeService // Inject employee service
  ) { }

  ngOnInit(): void {
    // Fetch the performance data from the API
    const filePath = "hdfs://localhost:9000/user/hadoop/performance_output/part-r-00000";
    this.employeeService.getPerformanceData(filePath).subscribe((response: any) => {
      if (response.status === 'pass') {
        this.performanceData = response.body;

        // Calculate performance data once it's fetched
        this.calculateDevelopmentPerformance();
        this.findTopPerformer();
        this.createPerformanceChart();
        this.createTopPerformerPieChart();
      } else {
        console.error('Failed to fetch performance data');
      }
    }, error => {
      console.error('Error fetching performance data:', error);
    });
  }

  // Calculate Development department performance (emp1, emp2, emp3)
  calculateDevelopmentPerformance() {
    const devEmployees = [1, 2, 3];
    let totalPerformance = 0;
    devEmployees.forEach(empId => {
      const performance = this.performanceData[`emp${empId}`];
      if (performance) {
        totalPerformance += performance;
      }
    });
    this.developmentPerformance = totalPerformance / devEmployees.length; // Average performance for the development department
  }

  // Find the top performer (employee with the highest performance score)
  findTopPerformer() {
    let maxPerformance = 0;
    let topEmp = '';
    for (let empId in this.performanceData) {
      if (empId !== 'Overall Performance') {
        const performance = this.performanceData[empId];
        if (performance > maxPerformance) {
          maxPerformance = performance;
          topEmp = empId;
        }
      }
    }
    this.topPerformer = topEmp;
    this.topPerformance = maxPerformance;
    this.overallPerformance = this.performanceData['Overall Performance']; // Get overall company performance

    // Mocked employee details (for demonstration purposes)
    this.topPerformerDetails = {
      name: 'John Doe',
      department: 'Development',
      performance: this.topPerformance
    };
  }

  // Create the bar chart for overall company performance
  createPerformanceChart() {
    new Chart('performanceChart', {
      type: 'bar',  // Using bar chart for overall company performance
      data: {
        labels: ['Overall Performance'],
        datasets: [{
          label: 'Company Performance',
          data: [this.overallPerformance],  // Using the overall performance value
          backgroundColor: '#4caf50',  // Green color for the bar
          borderColor: '#fff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5  // Assuming the performance score ranges from 0 to 5
          }
        }
      }
    });
  }

  // Create the pie chart for the top performer's performance distribution
  createTopPerformerPieChart() {
    new Chart('topPerformerChart', {
      type: 'pie',  // Using pie chart for top performer distribution
      data: {
        labels: ['Performance'],
        datasets: [{
          data: [this.topPerformance, 5 - this.topPerformance],  // Top performance vs remaining
          backgroundColor: ['#4caf50', '#e0e0e0'],
          hoverBackgroundColor: ['#66bb6a', '#c7c7c7']
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  // Navigate to the top performer's detailed view page
  viewTopPerformer() {
    this.router.navigate([`/employee/${this.topPerformer}`]);  // Navigate to the top performer's page
  }
}
