import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = `${environment.apiUrl}/grades`; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}


  // Helper: Set headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token'); // Retrieve token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Fetch paginated grades
  getGrades(page: number = 0, size: number = 20, eagerload: boolean = true): Observable<any> {
    const headers = this.getHeaders();
    const params = {
      page: page.toString(),
      size: size.toString(),
      eagerload: eagerload.toString(),
    };

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  // Create a new grade
  createGrade(grade: { name: string }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, grade, { headers });
  }

  // Update an existing grade
  updateGrade(id: number, grade: { name: string }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, { id, name: grade.name }, { headers });
  }

  // Delete a grade
  deleteGrade(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
