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
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const userName = localStorage.getItem('userName');
    this.isAdmin = userName === 'admin';
  }

  logout() {
    console.log("logout pressed");
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page
  }
}
