import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDevelopersComponent } from './view-developers.component';

describe('ViewDevelopersComponent', () => {
  let component: ViewDevelopersComponent;
  let fixture: ComponentFixture<ViewDevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDevelopersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
