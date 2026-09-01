import { TestBed } from '@angular/core/testing';

import { NewAccService } from './new-acc.service';

describe('NewAccService', () => {
  let service: NewAccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewAccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
