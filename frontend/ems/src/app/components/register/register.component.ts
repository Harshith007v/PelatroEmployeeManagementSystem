import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  newPassword: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onRegister(): void {

    const user = {
      userName: this.username,
      password: this.newPassword,
      userEmail: this.email
    };

    this.authService.registerUser(user).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.errorMessage = err.error?.message || 'An error occurred during registration.';
      }
    });
  }
}
