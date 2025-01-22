import { Component, OnInit } from '@angular/core';
import { CommitteeService } from '../../../services/committee.service';
import { GradeService } from '../../../services/grade.service';
import { FacultyService } from '../../../services/faculty.service';

@Component({
  selector: 'app-edit-metadata',
  standalone: false,
  templateUrl: './edit-metadata.component.html',
  styleUrls: ['./edit-metadata.component.css']
})
export class EditMetadataComponent implements OnInit {
  positions: any[] = [];
  grades: any[] = [];
  committees: any[] = [];

  newPosition: string = '';
  newGrade: string = '';
  newCommittee: string = '';

  activeTab: string = 'positions'; // Default to 'positions'

  constructor(
    private committeeService: CommitteeService,
    private gradeService: GradeService,
    private positionService: FacultyService
  ) {}

  ngOnInit(): void {
    this.loadAllFields();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  loadAllFields(): void {
    this.loadPositions();
    this.loadGrades();
    this.loadCommittees();
  }

  // Positions
  loadPositions(): void {
    this.positionService.getFaculties().subscribe(
      (response) => {
        this.positions = response; // Assuming paginated response
      },
      (error) => console.error('Σφάλμα κατά τη φόρτωση ιδιοτήτων:', error)
    );
  }

  addPosition(): void {
    if (this.newPosition.trim()) {
      const position = { name: this.newPosition.trim() };
      this.positionService.createFaculty(position).subscribe(
        (data: any) => {
          this.positions.push(data);
          this.newPosition = '';
          alert('Η ιδιότητα προστέθηκε με επιτυχία.');
        },
        (error) => alert('Σφάλμα κατά την προσθήκη ιδιότητας: ' + error.message)
      );
    }
  }

  updatePosition(position: any): void {
    this.positionService.updateFaculty(position.id, { name: position.name }).subscribe(
      () => alert('Η ιδιότητα ενημερώθηκε με επιτυχία.'),
      (error) => alert('Σφάλμα κατά την ενημέρωση ιδιότητας: ' + error.message)
    );
  }

  deletePosition(id: number): void {
    this.positionService.deleteFaculty(id).subscribe(
      () => {
        this.positions = this.positions.filter((p) => p.id !== id);
        alert('Η ιδιότητα διαγράφηκε με επιτυχία.');
      },
      (error) => alert('Σφάλμα κατά τη διαγραφή ιδιότητας: ' + error.message)
    );
  }

  // Grades
  loadGrades(): void {
    this.gradeService.getGrades().subscribe(
      (response) => {
        this.grades = response; // Assuming paginated response
      },
      (error) => console.error('Σφάλμα κατά τη φόρτωση βαθμών:', error)
    );
  }

  addGrade(): void {
    if (this.newGrade.trim()) {
      const grade = { name: this.newGrade.trim() };
      this.gradeService.createGrade(grade).subscribe(
        (data: any) => {
          this.grades.push(data);
          this.newGrade = '';
          alert('Ο βαθμός προστέθηκε με επιτυχία.');
        },
        (error) => alert('Σφάλμα κατά την προσθήκη βαθμού: ' + error.message)
      );
    }
  }

  updateGrade(grade: any): void {
    this.gradeService.updateGrade(grade.id, { name: grade.name }).subscribe(
      () => alert('Ο βαθμός ενημερώθηκε με επιτυχία.'),
      (error) => alert('Σφάλμα κατά την ενημέρωση βαθμού: ' + error.message)
    );
  }

  deleteGrade(id: number): void {
    this.gradeService.deleteGrade(id).subscribe(
      () => {
        this.grades = this.grades.filter((g) => g.id !== id);
        alert('Ο βαθμός διαγράφηκε με επιτυχία.');
      },
      (error) => alert('Σφάλμα κατά τη διαγραφή βαθμού: ' + error.message)
    );
  }

  // Committees
  loadCommittees(): void {
    this.committeeService.getCommittees().subscribe(
      (response) => {
        this.committees = response; // Assuming paginated response
      },
      (error) => console.error('Σφάλμα κατά τη φόρτωση επιτροπών:', error)
    );
  }

  addCommittee(): void {
    if (this.newCommittee.trim()) {
      const committee = { name: this.newCommittee.trim() };
      this.committeeService.createCommittee(committee).subscribe(
        (data: any) => {
          this.committees.push(data);
          this.newCommittee = '';
          alert('Η επιτροπή προστέθηκε με επιτυχία.');
        },
        (error) => alert('Σφάλμα κατά την προσθήκη επιτροπής: ' + error.message)
      );
    }
  }

  updateCommittee(committee: any): void {
    this.committeeService.updateCommittee(committee.id, { name: committee.name }).subscribe(
      () => alert('Η επιτροπή ενημερώθηκε με επιτυχία.'),
      (error) => alert('Σφάλμα κατά την ενημέρωση επιτροπής: ' + error.message)
    );
  }

  deleteCommittee(id: number): void {
    this.committeeService.deleteCommittee(id).subscribe(
      () => {
        this.committees = this.committees.filter((c) => c.id !== id);
        alert('Η επιτροπή διαγράφηκε με επιτυχία.');
      },
      (error) => alert('Σφάλμα κατά τη διαγραφή επιτροπής: ' + error.message)
    );
  }
}
