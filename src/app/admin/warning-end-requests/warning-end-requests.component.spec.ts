import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningEndRequestsComponent } from './warning-end-requests.component';

describe('WarningEndRequestsComponent', () => {
  let component: WarningEndRequestsComponent;
  let fixture: ComponentFixture<WarningEndRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningEndRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarningEndRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
