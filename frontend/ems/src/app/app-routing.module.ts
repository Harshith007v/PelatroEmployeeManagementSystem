import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { DailyTimeLogComponent } from './components/daily-time-log/daily-time-log.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth-guard';
import { AuthRedirectGuard } from './auth-redirect-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthRedirectGuard] },

  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'createEmployees', component: CreateEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'searchEmployees', component: SearchEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'update-employees/:id', component: UpdateEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'view-employee/:id', component: ViewEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'daily-time-log', component: DailyTimeLogComponent, canActivate: [AuthGuard] },


  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
