import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRequestsComponent } from './upload-requests.component';

describe('UploadRequestsComponent', () => {
  let component: UploadRequestsComponent;
  let fixture: ComponentFixture<UploadRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
