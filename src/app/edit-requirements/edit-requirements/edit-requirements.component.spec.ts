import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequirementsComponent } from './edit-requirements.component';

describe('EditRequirementsComponent', () => {
  let component: EditRequirementsComponent;
  let fixture: ComponentFixture<EditRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRequirementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
