// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class SubmissionAuditService {
  private apiUrl = `${environment.apiUrl}/submission-audits`; // Base API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Fetches the audit details for a specific submission by ID.
   * @param id The ID of the submission audit.
   * @returns Observable containing the audit details.
   */
  getSubmissionAuditById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/by-submission/${id}`, { headers });
  }

  /**
   * Utility method to generate headers with authentication token.
   * Includes Bearer token for authorization.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token'); // Retrieve the token from localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
