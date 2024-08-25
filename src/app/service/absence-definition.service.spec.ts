import { TestBed } from '@angular/core/testing';

import { AbsenceDefinitionService } from './absence-definition.service';

describe('AbsenceDefinitionService', () => {
  let service: AbsenceDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenceDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
