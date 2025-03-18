// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = `${environment.apiUrl}/submissions`; // API endpoint

  constructor(private http: HttpClient) {}

  // Method to post a new submission
  createSubmission(submission: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, submission, { headers });
  }

  // Method to update an existing submission
  updateSubmission(submissionId: number, updatedSubmission: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${submissionId}`, updatedSubmission, { headers });
  }

  // Fetch paginated submissions
  getSubmissions(page: number = 0, size: number = 20, eagerload: boolean = true): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = {
      page: page.toString(),
      size: size.toString(),
      eagerload: eagerload.toString()
    };
    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  // Utility method to generate headers with authentication token
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token'); // Retrieve the token from localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
}
