import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = 'http://localhost:8080/api/submissions'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Method to post a new submission
  createSubmission(submission: any): Observable<any> {
    const token = localStorage.getItem('auth-token'); // Retrieve the token from localStorage
    console.log('Token:', localStorage.getItem('auth-token'));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    
    return this.http.post<any>(this.apiUrl, submission, { headers });
  }
}
