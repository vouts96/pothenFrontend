import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private apiUrl = '${environment.apiUrl}/positions'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}


  // Helper: Set headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token'); // Retrieve token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Fetch paginated Faculties
  getFaculties(page: number = 0, size: number = 20, eagerload: boolean = true): Observable<any> {
    const headers = this.getHeaders();
    const params = {
      page: page.toString(),
      size: size.toString(),
      eagerload: eagerload.toString(),
    };

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  // Create a new committee
  createFaculty(faculty: { name: string }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, faculty, { headers });
  }

  // Update an existing faculty
  updateFaculty(id: number, faculty: { name: string }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { id, faculty }, { headers });
  }

  // Delete a faculty
  deleteFaculty(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
