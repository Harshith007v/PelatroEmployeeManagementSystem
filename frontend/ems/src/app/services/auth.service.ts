import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post("http://localhost:8080/api/register", user).pipe(map((response: any) => {
      if (response.status === "pass") {
        Swal.fire('Registered!', 'User Registration Successfull.', 'success');
        return response.body;
      } else {
        throw new Error('Failed to register user');
      }
    }));;
  }

  loginUser(user: any): Observable<any> {
    return this.http.post("http://localhost:8080/api/login", user);
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken')
  }


  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
