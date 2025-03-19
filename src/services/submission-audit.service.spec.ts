import { TestBed } from '@angular/core/testing';

import { SubmissionAuditService } from './submission-audit.service';

describe('SubmissionAuditService', () => {
  let service: SubmissionAuditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionAuditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
