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
      (error) => console.error('Error loading positions:', error)
    );
  }

  addPosition(): void {
    if (this.newPosition.trim()) {
      const position = { name: this.newPosition.trim() };
      this.positionService.createFaculty(position).subscribe(
        (data: any) => {
          this.positions.push(data);
          this.newPosition = '';
        },
        (error) => console.error('Error adding position:', error)
      );
    }
  }

  updatePosition(position: any): void {
    this.positionService.updateFaculty(position.id, { name: position.name }).subscribe(
      () => console.log('Position updated:', position),
      (error) => console.error('Error updating position:', error)
    );
  }

  deletePosition(id: number): void {
    this.positionService.deleteFaculty(id).subscribe(
      () => {
        this.positions = this.positions.filter((p) => p.id !== id);
      },
      (error) => console.error('Error deleting position:', error)
    );
  }

  // Grades
  loadGrades(): void {
    this.gradeService.getGrades().subscribe(
      (response) => {
        this.grades = response; // Assuming paginated response
      },
      (error) => console.error('Error loading grades:', error)
    );
  }

  addGrade(): void {
    if (this.newGrade.trim()) {
      const grade = { name: this.newGrade.trim() };
      this.gradeService.createGrade(grade).subscribe(
        (data: any) => {
          this.grades.push(data);
          this.newGrade = '';
        },
        (error) => console.error('Error adding grade:', error)
      );
    }
  }

  updateGrade(grade: any): void {
    this.gradeService.updateGrade(grade.id, { name: grade.name }).subscribe(
      () => console.log('Grade updated:', grade),
      (error) => console.error('Error updating grade:', error)
    );
  }

  deleteGrade(id: number): void {
    this.gradeService.deleteGrade(id).subscribe(
      () => {
        this.grades = this.grades.filter((g) => g.id !== id);
      },
      (error) => console.error('Error deleting grade:', error)
    );
  }

  // Committees
  loadCommittees(): void {
    this.committeeService.getCommittees().subscribe(
      (response) => {
        this.committees = response; // Assuming paginated response
      },
      (error) => console.error('Error loading committees:', error)
    );
  }

  addCommittee(): void {
    if (this.newCommittee.trim()) {
      const committee = { name: this.newCommittee.trim() };
      this.committeeService.createCommittee(committee).subscribe(
        (data: any) => {
          this.committees.push(data);
          this.newCommittee = '';
        },
        (error) => console.error('Error adding committee:', error)
      );
    }
  }

  updateCommittee(committee: any): void {
    this.committeeService.updateCommittee(committee.id, { name: committee.name }).subscribe(
      () => console.log('Committee updated:', committee),
      (error) => console.error('Error updating committee:', error)
    );
  }

  deleteCommittee(id: number): void {
    this.committeeService.deleteCommittee(id).subscribe(
      () => {
        this.committees = this.committees.filter((c) => c.id !== id);
      },
      (error) => console.error('Error deleting committee:', error)
    );
  }

}
