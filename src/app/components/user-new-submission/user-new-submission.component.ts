import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmissionService } from '../../../services/submission.service';
import { CommitteeService } from '../../../services/committee.service';
import { GradeService } from '../../../services/grade.service';
import { FacultyService } from '../../../services/faculty.service';

@Component({
  selector: 'app-user-new-submission',
  standalone: false,
  
  templateUrl: './user-new-submission.component.html',
  styleUrl: './user-new-submission.component.css'
})
export class UserNewSubmissionComponent implements OnInit {
  submissionForm: FormGroup;
  committees: any[] = []; // Store committees retrieved from the service
  faculties: any[] = []; // Store faculties retrieved from the service
  grades: any[] = []; // Store grades retrieved from the service

  constructor(private authService: AuthService, 
              private fb: FormBuilder, 
              private submissionService: SubmissionService,
              private committeeService: CommitteeService,
              private gradeService: GradeService,
              private facultyService: FacultyService){
    this.submissionForm = this.fb.group({
      afm: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // Α.Φ.Μ.: 9-digit number
      adt: ['', Validators.required], // Α.Δ.Τ - Α.Γ.Μ
      lastName: ['', Validators.required], // Επώνυμο
      firstName: ['', Validators.required], // Όνομα
      fatherName: ['', Validators.required], // Πατρώνυμο 
      acquisitionDate: ['', Validators.required], // Ημ/νία Απόκτησης Ιδιότητας
      lossDate: [''], // Ημ/νία Απώλειας Ιδιότητας (optional)
      organizationUnit: ['', Validators.required], // Οργανική Μονάδα
      newOrganizationUnit: [''], // Νέα Οργανική Μονάδα (optional) 
      protocolNumber: ['', Validators.required], // Αριθμός πρωτοκόλλου απόφασης
      decisionDate: ['', Validators.required], // Ημ/νία Έκδοσης Απόφασης
      previousSubmission: ['', Validators.required], // Έχετε υποβάλει το προηγούμενο έτος (Yes/No)
      position: ['', Validators.required], // Ιδιότητα
      grade: ['', Validators.required], // Βαθμός
      committeeName: ['', Validators.required] // Όνομα Επιτροπής
    });

  }

  ngOnInit(): void {
    this.loadCommittees();
    this.loadFaculties();
    this.loadGrades();
    this.authService.getAccount().subscribe(response => {
      console.log(response)
      this.submissionForm.patchValue({
        afm: response.login,
        lastName: response.lastName,
        firstName: response.firstName
      })
    }, error => {

    }) 
  }

  // Fetch committees from the service
  loadCommittees(): void {
    this.committeeService.getCommittees().subscribe(
      (data) => {
        this.committees = data; // Store the data in the component property
      },
      (error) => {
        console.error('Error fetching committees:', error);
      }
    );
  }

  // Fetch faculties from the service
  loadFaculties(): void {
    this.facultyService.getFaculties().subscribe(
      (data) => {
        this.faculties = data; // Store the data in the component property
      },
      (error) => {
        console.error('Error fetching faculties:', error);
      }
    );
  }

   // Fetch grades from the service
   loadGrades(): void {
    this.gradeService.getGrades().subscribe(
      (data) => {
        this.grades = data; // Store the data in the component property
      },
      (error) => {
        console.error('Error fetching grades:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.submissionForm.valid) {
      this.authService.getAccount().subscribe(response => {
        console.log(response)

        const formData = {
          afm: this.submissionForm.get('afm')?.value,
          adt: this.submissionForm.get('adt')?.value,
          lastName: this.submissionForm.get('lastName')?.value,
          firstName: this.submissionForm.get('firstName')?.value,
          fatherName: this.submissionForm.get('fatherName')?.value,
          acquisitionDate: this.submissionForm.get('acquisitionDate')?.value,
          lossDate: this.submissionForm.get('lossDate')?.value,
          organizationUnit: this.submissionForm.get('organizationUnit')?.value,
          newOrganizationUnit: this.submissionForm.get('newOrganizationUnit')?.value,
          protocolNumber: this.submissionForm.get('protocolNumber')?.value,
          decisionDate: this.submissionForm.get('decisionDate')?.value,
          previousSubmission: this.submissionForm.get('previousSubmission')?.value,
          position: this.submissionForm.get('position')?.value,
          grade: this.submissionForm.get('grade')?.value,
          committeeName: this.submissionForm.get('committeeName')?.value,
          user: {
            id: response.id,
            login: response.login
          }
        }
        console.log('Form Submitted Successfully:', formData);


        // Call the submission service to post the data
        this.submissionService.createSubmission(formData).subscribe(
          (response) => {
            console.log('Submission created successfully:', response);
            alert('Submission created successfully!');
          },
          (error) => {
            console.error('Error creating submission:', error);
            alert('Failed to create submission. Please try again.');
          }
        );
      }, error => {

      }) 
      
    } else {
      console.log('Form is invalid. Please correct the errors and try again.');
      this.submissionForm.markAllAsTouched();
    }
  }

  disconnect(): void {
    this.authService.logout()
  }
}
