import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config';


@Injectable({
  providedIn: 'root'
})
export class CommitteeService {
  private apiUrl = `${environment.apiUrl}/committees`; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  // Helper: Set headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token'); // Retrieve token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Fetch paginated committees
  getCommittees(page: number = 0, size: number = 20, eagerload: boolean = true): Observable<any> {
    const headers = this.getHeaders();
    const params = {
      page: page.toString(),
      size: size.toString(),
      eagerload: eagerload.toString(),
    };

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  // Create a new committee
  createCommittee(committee: { name: string }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(this.apiUrl, committee, { headers });
  }

  // Update an existing committee
  updateCommittee(id: number, committee: { name: string }): Observable<any> {
    const headers = this.getHeaders();
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { id, committee }, { headers });
  }

  // Delete a committee
  deleteCommittee(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
