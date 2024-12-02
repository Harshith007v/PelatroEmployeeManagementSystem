import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const user = { userName: this.userName, password: this.password };

    this.authService.loginUser(user).subscribe(
      (response) => {
        // Check if the response contains a token
        if (response && response.token) {
          // Store the JWT token
          this.authService.setToken(response.token);
          console.log(response.token); // Log the token for debugging

          // Show success alert
          Swal.fire('Logged In!', 'User LogIn Successful.', 'success');

          // Navigate to the dashboard
          this.router.navigate(['/dashboard']);
          console.log('Login successful');
        } else {
          // If no token in response, treat as login failure
          Swal.fire('Login Failed', 'Incorrect username or password.', 'error');
          console.log('Login failed: Incorrect username or password');
        }
      },
      (error) => {
        if (error.status === 401) {
          // Handle unauthorized error (incorrect credentials)
          Swal.fire('Unauthorized', 'Incorrect username or password.', 'error');
          console.log('Login failed: Incorrect username or password');
        } else {
          // Handle other unexpected errors
          Swal.fire(
            'Error',
            'An unexpected error occurred. Please try again later.',
            'error'
          );
          console.log('Login failed: Unknown error', error);
        }
      }
    );
  }
}
