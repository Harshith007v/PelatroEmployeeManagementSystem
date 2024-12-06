import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service'; // Assume you have an Employee service
import { Employee } from '../../employee'; // Assume Employee model is defined
import { Department } from '../../department'; // Assume Department model is defined
import { DepartmentServiceService } from 'src/app/services/department-service.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent implements OnInit {

  employee: Employee = {
    firstName: '',
    lastName: '',
    emailId: '',
    role: '',
    department: {} as Department,
    phone: '',
    joiningDate: '',
    id: 0,
    profilePicture: '',
    profilePicturePath: ''
  };
  departments: Department[] = []; // Store departments
  imageSrc: string | ArrayBuffer | null = null; // Image preview

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentServiceService
  ) { }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id'); // Get employee id from URL
    if (employeeId) {
      const id = +employeeId;
      this.employeeService.getEmployeeById(id).subscribe((data) => {
        this.employee = data;
        // Handle setting the imageSrc if the employee has an image
      });
    }
    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data;
    });
  }

  // Handle file selection
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = reader.result; // Set the image source for preview
      };
      reader.readAsDataURL(file);
    }
  }

  // Upload the image to the server
  onUploadImage(): void {
    if (this.imageSrc) {
      // Implement image upload logic here
    }
  }

  // Submit the form to update the employee details
  onSubmit(): void {
    if (this.employee.id) {
      // Correctly pass both employee ID and employee object to the updateEmployee method
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(
        (response) => {
          console.log('Employee updated successfully', response);
          this.router.navigate(['/employee-list']); // Redirect to employee list after update
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }

  // Close the form (navigate back)
  closeForm(): void {
    this.router.navigate(['/employee-list']);
  }

  // Clear form fields
  clearFields(): void {
    this.employee = {
      firstName: '',
      lastName: '',
      emailId: '',
      role: '',
      department: {} as Department,
      phone: '',
      joiningDate: '',
      id: 0,
      profilePicture: '',
      profilePicturePath: ''
    };
    this.imageSrc = null;
  }
}
