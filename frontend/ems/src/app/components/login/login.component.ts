import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    const user = { userName: this.userName, password: this.password };

    this.authService.loginUser(user).subscribe(
      (response) => {
        if (response.status === "pass") {
          this.authService.setToken(response.body.password);
          Swal.fire('Logged In!', 'User LogIn Successful.', 'success');
          console.log(!localStorage.getItem('authToken'));
          this.router.navigate(['/dashboard']);
          console.log("login successful");
        } else {
          Swal.fire('Login Failed', 'Incorrect username or password.', 'error');
          console.log("login failed: incorrect username or password");
        }
      },
      (error) => {
        if (error.status === 401) {
          Swal.fire('Unauthorized', 'Incorrect username or password.', 'error');
          console.log("login failed: incorrect username or password");
        } else {
          Swal.fire('Error', 'An unexpected error occurred. Please try again later.', 'error');
          console.log("login failed: unknown error", error);
        }
      }
    );
  }

}
