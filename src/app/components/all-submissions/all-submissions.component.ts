import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubmissionService } from '../../../services/submission.service'; // Adjust path as needed
import { SubmissionAuditService } from '../../../services/submission-audit.service';

@Component({
  selector: 'app-all-submissions',
  standalone: false,
  templateUrl: './all-submissions.component.html',
  styleUrls: ['./all-submissions.component.css']
})
export class AllSubmissionsComponent implements OnInit {
  submissions: any[] = []; // Array to hold submissions
  audits: { [key: number]: any } = {}; // Store audits by submission ID
  currentPage: number = 0;
  totalPages: number = 0;
  expandedSubmissionId: number | null = null; // Track which submission's details are expanded
  expandedChatId: number | null = null;

  constructor(
    private submissionService: SubmissionService,
    private submissionAuditService: SubmissionAuditService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubmissions();
  }

  toggleDetails(submissionId: number): void {
    // If the same submission is clicked again, collapse it
    this.expandedSubmissionId = this.expandedSubmissionId === submissionId ? null : submissionId;
  }

  toggleChat(submissionId: number): void {
    if (this.expandedChatId === submissionId) {
      this.expandedChatId = null; // Collapse chat if clicked again
    } else {
      this.expandedChatId = submissionId; // Expand chat
      this.loadSubmissionAudit(submissionId); // Fetch audit data
    }
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

  // Fetch audit details for a submission
  loadSubmissionAudit(submissionId: number): void {
    if (!this.audits[submissionId]) {
      this.submissionAuditService.getSubmissionAuditById(submissionId).subscribe(
        (auditData) => {
          this.audits[submissionId] = auditData;
          console.log(`Audit Data for submission ${submissionId}:`, auditData);
        },
        (error) => {
          console.error(`Error fetching audit for submission ${submissionId}:`, error);
        }
      );
    }
  }

  // Disconnect the user
  disconnect(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
