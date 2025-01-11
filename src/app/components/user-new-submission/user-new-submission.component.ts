import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-new-submission',
  standalone: false,
  
  templateUrl: './user-new-submission.component.html',
  styleUrl: './user-new-submission.component.css'
})
export class UserNewSubmissionComponent {
  submissionForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder){
    this.submissionForm = this.fb.group({
      afm: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // Α.Φ.Μ.: 9-digit number
      adt: ['', Validators.required], // Α.Δ.Τ - Α.Γ.Μ
      lastName: ['', Validators.required], // Επώνυμο
      firstName: ['', Validators.required], // Όνομα
      fatherName: ['', Validators.required], // Πατρώνυμο
      position: ['', Validators.required], // Ιδιότητα
      acquisitionDate: ['', Validators.required], // Ημ/νία Απόκτησης Ιδιότητας
      lossDate: [''], // Ημ/νία Απώλειας Ιδιότητας (optional)
      organizationUnit: ['', Validators.required], // Οργανική Μονάδα
      newOrganizationUnit: [''], // Νέα Οργανική Μονάδα (optional)
      grade: ['', Validators.required], // Βαθμός
      committeeName: ['', Validators.required], // Όνομα Επιτροπής
      protocolNumber: ['', Validators.required], // Αριθμός πρωτοκόλλου απόφασης
      decisionDate: ['', Validators.required], // Ημ/νία Έκδοσης Απόφασης
      previousSubmission: ['', Validators.required] // Έχετε υποβάλει το προηγούμενο έτος (Yes/No)
    });

  }

  onSubmit(): void {
    if (this.submissionForm.valid) {
      const formData = this.submissionForm.value;
      console.log('Form Submitted Successfully:', formData);

      // Add logic to handle form data (e.g., send it to an API)
    } else {
      console.log('Form is invalid. Please correct the errors and try again.');
      this.submissionForm.markAllAsTouched();
    }
  }

  disconnect(): void {
    this.authService.logout()
  }
}
