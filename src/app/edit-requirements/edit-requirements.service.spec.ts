import { TestBed } from '@angular/core/testing';

import { EditRequirementsService } from './edit-requirements.service';

describe('EditRequirementsService', () => {
  let service: EditRequirementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditRequirementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
