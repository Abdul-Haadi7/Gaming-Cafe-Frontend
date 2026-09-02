import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRequirementsComponent } from './game-requirements.component';

describe('GameRequirementsComponent', () => {
  let component: GameRequirementsComponent;
  let fixture: ComponentFixture<GameRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRequirementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
