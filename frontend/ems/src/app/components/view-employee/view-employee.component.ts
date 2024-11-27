import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {


  id: number;
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.createTaskCompletionChart();
    this.createAttendanceChart();
    this.createReviewScoreChart();
    this.createLeadershipScoreChart();

    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data
    })


  }

  createTaskCompletionChart() {
    new Chart('taskCompletionChart', {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending'],
        datasets: [{
          label: 'Task Completion',
          data: [95, 5],
          backgroundColor: ['#4caf50', '#f44336'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });
  }

  createAttendanceChart() {
    new Chart('attendanceChart', {
      type: 'bar',
      data: {
        labels: ['Attendance'],
        datasets: [{
          label: 'Attendance Rate',
          data: [98],
          backgroundColor: '#2196f3',
          borderColor: '#1976d2',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500, // Animation duration
          easing: 'easeOutBounce' // Bounce effect
        }
      }
    });
  }

  createReviewScoreChart() {
    new Chart('reviewScoreChart', {
      type: 'radar',
      data: {
        labels: ['Teamwork', 'Leadership', 'Efficiency', 'Innovation', 'Communication'],
        datasets: [{
          label: 'Review Score',
          data: [4.7, 4.6, 4.8, 4.5, 4.9],
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
          borderColor: '#3f51b5',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scale: {
          ticks: { beginAtZero: true, max: 5 }
        },
        animation: {
          duration: 1000, // Animation duration
          easing: 'easeOutQuad'
        }
      }
    });
  }

  createLeadershipScoreChart() {
    new Chart('leadershipScoreChart', {
      type: 'pie',
      data: {
        labels: ['Leadership Score'],
        datasets: [{
          label: 'Leadership',
          data: [87, 13],
          backgroundColor: ['#ffeb3b', '#e0e0e0'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        animation: {
          animateScale: true
        }
      }
    });
  }

  backToEmployeeList() {
    this.router.navigate(['employees']);
  }

}
