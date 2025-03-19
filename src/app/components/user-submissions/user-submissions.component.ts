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
  expandedSubmissionId: number | null = null; // Track which submission's details are expanded
  editingSubmissionId: number | null = null;
  backupSubmission: any | null = null;

  constructor(private submissionService: SubmissionService, private router: Router) {}

  ngOnInit(): void {
    this.loadSubmissions();
  }

  toggleDetails(submissionId: number): void {
    if (this.expandedSubmissionId === submissionId) {
      this.expandedSubmissionId = null; // Close if same ID is clicked
    } else {
      this.expandedSubmissionId = submissionId;
      this.editingSubmissionId = null; // Close edit form if open
    }
  }
  
  toggleEdit(submissionId: number): void {
    if (this.editingSubmissionId === submissionId) {
      this.editingSubmissionId = null; // Close if same ID is clicked
    } else {
      this.editingSubmissionId = submissionId;
      this.expandedSubmissionId = null; // Close details if open
      const submission = this.submissions.find(s => s.id === submissionId);
      if (submission) {
        this.backupSubmission = { ...submission };
      }
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

  saveChanges(submissionId: number) {
    const submission = this.submissions.find(s => s.id === submissionId);
    if (submission) {
      this.submissionService.updateSubmission(submissionId, submission).subscribe(
        (response) => {
          console.log('Submission updated successfully', response);
          alert('Οι αλλαγές αποθηκεύτηκαν με επιτυχία.')
          this.editingSubmissionId = null; // Close the form
        },
        (error) => {
          console.error('Error updating submission:', error);
          alert('Σφάλμα κατά την αποθήκευση των αλλαγών.')
        }
      );
    }
  }
  

  cancelEdit() {
    if (this.backupSubmission) {
      const index = this.submissions.findIndex(s => s.id === this.backupSubmission?.id);
      if (index !== -1) {
        this.submissions[index] = this.backupSubmission;
      }
    }
    this.editingSubmissionId = null;
  }


  // Disconnect the user
  disconnect(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
