import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWarningsComponent } from './active-warnings.component';

describe('ActiveWarningsComponent', () => {
  let component: ActiveWarningsComponent;
  let fixture: ComponentFixture<ActiveWarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveWarningsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
