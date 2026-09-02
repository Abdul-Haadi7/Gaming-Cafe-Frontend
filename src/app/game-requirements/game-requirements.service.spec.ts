import { TestBed } from '@angular/core/testing';

import { GameRequirementsService } from './game-requirements.service';

describe('GameRequirementsService', () => {
  let service: GameRequirementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameRequirementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
