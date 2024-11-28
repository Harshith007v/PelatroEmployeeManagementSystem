import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'Employee Management System';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  logout() {
    console.log("logout pressed");
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }
}
