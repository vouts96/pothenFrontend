import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubmissionService } from '../../../services/submission.service'; // Adjust path as needed

@Component({
  selector: 'app-user-submissions',
  standalone: false,
  templateUrl: './user-submissions.component.html',
  styleUrls: ['./user-submissions.component.css']
})
export class UserSubmissionsComponent implements OnInit {
  submissions: any[] = []; // Array to hold submissions
  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private submissionService: SubmissionService, private router: Router) {}

  ngOnInit(): void {
    this.loadSubmissions();
  }

  // Fetch submissions from the backend
  loadSubmissions(): void {
    this.submissionService.getSubmissions(0, 20).subscribe(
      (response) => {
        this.submissions = response || []; // Ensure submissions is an array
        this.totalPages = 1; // Replace with actual pagination data if available
      },
      (error) => {
        console.error('Error fetching submissions:', error);
      }
    );
  }

  // Navigate to specific submission details
  goToSubmission(id: number): void {
    this.router.navigate(['/submission-details', id]);
  }

  // Disconnect the user
  disconnect(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
