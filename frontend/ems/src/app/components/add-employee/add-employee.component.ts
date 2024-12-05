import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  closeForm() {
    throw new Error('Method not implemented.');
  }
  onUploadImage() {
    throw new Error('Method not implemented.');
  }
  clearFields() {
    throw new Error('Method not implemented.');
  }
  // Model to bind the form fields
  employee = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    joiningDate: '',
  };

  // For image preview
  imageSrc: string | ArrayBuffer | null = '/assets/images/default_profile.jpg';

  constructor() {}

  ngOnInit(): void {}

  // Handle file input and display preview
  onFileSelect(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Handle form submission (e.g., save employee data)
  onSubmit() {
    console.log(this.employee); // You can replace this with actual submission logic
  }
}
