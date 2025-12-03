import { TestBed } from '@angular/core/testing';

import { MockWorkflowService } from './mock-workflow.service';

describe('MockWorkflowService', () => {
  let service: MockWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
