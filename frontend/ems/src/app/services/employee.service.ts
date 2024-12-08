import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../employee';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) { }

  getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<any>('http://localhost:8080/api/employees').pipe(
      map((response: any) => {
        if (response.status === 'pass') {
          return response.body;
        } else {
          throw new Error('Failed to fetch employees');
        }
      })
    );
  }

  createEmployee(formData: FormData): Observable<Object> {
    return this.httpClient
      .post('http://localhost:8080/api/employees', formData)
      .pipe(
        map((response: any) => {
          if (response.status === 'pass') {
            Swal.fire(
              'Added!',
              'Employee has been successfully added.',
              'success'
            );
            return response.body;
          } else {
            throw new Error('Failed to add employee');
          }
        })
      );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient
      .get<Employee>(`http://localhost:8080/api/employees/${id}`)
      .pipe(
        map((response: any) => {
          if (response.status === 'pass') {
            return response.body;
          } else {
            throw new Error('Failed to fetch employees');
          }
        })
      );
  }

  updateEmployee(id: number, formData: FormData): Observable<Object> {
    return this.httpClient
      .put(`http://localhost:8080/api/employees/${id}`, formData)
      .pipe(
        map((response: any) => {
          if (response.status === 'pass') {
            Swal.fire(
              'Updated!',
              'Employee has been successfully updated.',
              'success'
            );
            return response.body;
          } else {
            throw new Error('Failed to fetch employees');
          }
        })
      );
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient
      .delete(`http://localhost:8080/api/employees/${id}`)
      .pipe(
        map((response: any) => {
          if (response.status === 'pass') {
            return response.body;
          } else {
            throw new Error('Failed to fetch employees');
          }
        })
      );
  }

  addEmployeeTimeLog(timeLogData: any): Observable<any> {
    // Log the exact data being sent
    console.log('Sending data to backend:', JSON.stringify(timeLogData));

    return this.httpClient
      .post<any>('http://localhost:8080/api/logs', timeLogData)
      .pipe(
        map((response: any) => {
          // Log the status for debugging
          console.log('Response status:', response.status);

          if (response.status === 'pass') {
            Swal.fire(
              'Success!',
              'Time log has been successfully submitted.',
              'success'
            );
            return response.body;
          } else {
            // Log when status is not 'pass'
            console.error('Non-pass status received:', response);
            throw new Error('Failed to submit time log');
          }
        }),
        catchError((error: any) => {
          // Comprehensive error logging
          console.error('Full error object:', error);

          // If it's an HttpErrorResponse, log more details
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('Client-side error:', error.error.message);
          } else {
            // Server-side error
            console.error(
              `Backend returned code ${error.status}, body was: ${error.error}`
            );
          }

          // Rethrow the error
          return throwError(error);
        })
      );
  }

  getPerformanceData(filePath: string): Observable<any> {
    const performanceUrl = 'http://localhost:8080/api/workhours/performance';
    const params = new HttpParams().set('filePath', filePath); // Add the query parameter
    return this.httpClient.get<any>(performanceUrl, { params });
  }
}
