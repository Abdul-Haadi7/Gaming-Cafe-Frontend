import { TestBed } from '@angular/core/testing';

import { UploadGameService } from './upload-game.service';

describe('UploadGameService', () => {
  let service: UploadGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
