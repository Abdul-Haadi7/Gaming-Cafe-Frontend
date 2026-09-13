import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedWarningsComponent } from './received-warnings.component';

describe('ReceivedWarningsComponent', () => {
  let component: ReceivedWarningsComponent;
  let fixture: ComponentFixture<ReceivedWarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivedWarningsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceivedWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
