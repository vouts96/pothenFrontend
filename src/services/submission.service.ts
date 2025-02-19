import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = '${environment.apiUrl}/submissions'; // Replace with your actual API endpoint

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


  // Fetch paginated submissions
  getSubmissions(page: number = 0, size: number = 20, eagerload: boolean = true): Observable<any> {
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
