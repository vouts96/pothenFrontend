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

  downloadCSV(): void {
    if (!this.submissions || this.submissions.length === 0) return;
  
    const replacer = (key: string, value: any) => (value === null || value === undefined ? '' : value);
    const header = [
      'ID', 'ΑΦΜ', 'Όνομα', 'Επώνυμο', 'Ιδιότητα', 'Ημ/νία Απόκτησης',
      'Ημ/νία Απώλειας', 'Οργανική Μονάδα', 'Νέα Οργανική Μονάδα', 'Βαθμός',
      'Όνομα Επιτροπής', 'Αριθμός Πρωτοκόλλου', 'Ημ/νία Απόφασης', 'Προηγούμενη Υποβολή'
    ];
  
    const rows = this.submissions.map(sub => [
      sub.id,
      sub.afm,
      sub.firstName,
      sub.lastName,
      sub.position?.name,
      sub.acquisitionDate,
      sub.lossDate || '',
      sub.organizationUnit,
      sub.newOrganizationUnit || '',
      sub.grade?.name,
      sub.committeeName?.name,
      sub.protocolNumber,
      sub.decisionDate,
      sub.previousSubmission ? 'Ναι' : 'Όχι'
    ]);
  
    const csvContent =
      '\uFEFF' + // UTF-8 BOM for Excel compatibility
      [header, ...rows]
        .map(row => row.map(val => `"${val}"`).join(','))
        .join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'submissions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
}
