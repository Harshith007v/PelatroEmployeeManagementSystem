import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'createEmployees', component: CreateEmployeeComponent },
  { path: 'searchEmployees', component: SearchEmployeeComponent },
  { path: 'update-employees/:id', component: UpdateEmployeeComponent },
  { path: 'view-employee/:id', component: ViewEmployeeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
