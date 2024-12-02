import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<any>("http://localhost:8080/api/employees").pipe(map((response: any) => {
      if (response.status === "pass") {
        return response.body;
      } else {
        throw new Error('Failed to fetch employees');
      }
    }))
  }


  createEmployee(employee: Employee): Observable<Object> {
    return this.httpClient.post("http://localhost:8080/api/employees", employee).pipe(map((response: any) => {
      if (response.status === "pass") {
        Swal.fire('Added!', 'Employee has been successfully Added.', 'success');
        return response.body;
      } else {
        throw new Error('Failed to fetch employees');
      }
    }));;
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`http://localhost:8080/api/employees/${id}`).pipe(map((response: any) => {
      if (response.status === "pass") {
        return response.body;
      } else {
        throw new Error('Failed to fetch employees');
      }
    }))
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.httpClient.put(`http://localhost:8080/api/employees/${id}`, employee).pipe(map((response: any) => {
      if (response.status === "pass") {
        Swal.fire('Updated!', 'Employee has been successfully updated.', 'success');
        return response.body;
      } else {
        throw new Error('Failed to fetch employees');
      }
    }));
  }


  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`http://localhost:8080/api/employees/${id}`).pipe(map((response: any) => {
      if (response.status === "pass") {

        return response.body;
      } else {
        throw new Error('Failed to fetch employees');
      }
    }));
  }

  submitTimeLog(timeLogData: any): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/api/workhours`, timeLogData);
  }

}
