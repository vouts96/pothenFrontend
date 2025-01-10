import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewSubmissionComponent } from './user-new-submission.component';

describe('UserNewSubmissionComponent', () => {
  let component: UserNewSubmissionComponent;
  let fixture: ComponentFixture<UserNewSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNewSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
