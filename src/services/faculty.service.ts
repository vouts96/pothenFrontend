import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private apiUrl = 'http://localhost:8080/api/positions'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}


  // Fetch paginated submissions
  getFaculties(page: number = 0, size: number = 20, eagerload: boolean = true): Observable<any> {
    const token = localStorage.getItem('auth-token'); // Retrieve token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const params = {
      page: page.toString(),
      size: size.toString(),
      eagerload: eagerload.toString()
    };

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
