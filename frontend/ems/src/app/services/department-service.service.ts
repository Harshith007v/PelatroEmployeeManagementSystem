import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {


  constructor(private httpClient: HttpClient) { }

  getDepartments(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/api/departments").pipe(map((response: any) => {
      if (response.status === "pass") {
        return response.body;
      } else {
        throw new Error('Failed to fetch employees');
      }
    }))
  }
}
