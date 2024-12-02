import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/register', user).pipe(
      map((response: any) => {
        if (response.message === 'User registered successfully!') {
          console.log(response);
          Swal.fire('Registered!', 'User Registration Successful.', 'success');
          return response;
        } else {
          throw new Error(response.error || 'Failed to register user');
        }
      }),
      catchError((error) => {
        // Handle any HTTP errors that occur (e.g., network issues)
        Swal.fire(
          'Error',
          'Registration failed: ' + (error.message || 'Unknown error'),
          'error'
        );
        return throwError(error); // Return the error to propagate it
      })
    );
  }

  loginUser(user: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/login', user);
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
