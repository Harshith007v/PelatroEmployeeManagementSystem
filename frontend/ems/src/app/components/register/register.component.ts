import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';
  errorMessage: string = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must include at least one uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must include at least one lowercase letter.');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must include at least one digit.');
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push(
        'Password must include at least one special character (@$!%*?&).'
      );
    }

    return errors;
  }

  onRegister(): void {
    // Check if the username is empty
    if (!this.username.trim()) {
      this.errorMessage = 'Username cannot be empty.';
      Swal.fire({
        icon: 'error',
        title: 'Invalid Username',
        text: this.errorMessage,
      });
      return;
    }

    // Validate email format
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: this.errorMessage,
      });
      return;
    }

    // Check if passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      Swal.fire({
        icon: 'error',
        title: 'Passwords Do Not Match',
        text: this.errorMessage,
      });
      return;
    }

    // Validate password strength
    const passwordErrors = this.validatePassword(this.newPassword);
    if (passwordErrors.length > 0) {
      this.errorMessage = passwordErrors.join(' ');
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        html: `<ul>${passwordErrors
          .map((err) => `<li>${err}</li>`)
          .join('')}</ul>`,
      });
      return;
    }

    // Clear inline error message before sending request
    this.errorMessage = '';

    const user = {
      userName: this.username,
      password: this.newPassword,
      userEmail: this.email,
    };

    this.authService.registerUser(user).subscribe({
      next: (response) => {
        this.errorMessage = '';
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered. Redirecting to login...',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'An error occurred during registration.';
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: this.errorMessage,
        });
      },
    });
  }
}
