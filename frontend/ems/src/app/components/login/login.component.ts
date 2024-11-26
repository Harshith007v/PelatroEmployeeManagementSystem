import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']); // Redirect to home on success
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
