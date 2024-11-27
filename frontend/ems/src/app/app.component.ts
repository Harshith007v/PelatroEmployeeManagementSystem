import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number,
  collapsed: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'Employee Management System';

  constructor(public router: Router) { }

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  isAuthRoute(): boolean {

    return this.router.url === '/login' || this.router.url === '/register';
  }
}
