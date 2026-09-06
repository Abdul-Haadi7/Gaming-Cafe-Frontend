import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameRequirement } from '../../models/GameReq';
import { ActivatedRoute } from '@angular/router';
import { GameRequirementsService } from '../game-requirements.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game-requirements',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './game-requirements.component.html',
  styleUrl: './game-requirements.component.css'
})
export class GameRequirementsComponent 
{
 requirementsForm: FormGroup;
 requirements: GameRequirement = {
    gameId: 0,
    os: '',
    processor: '',
    ram: '',
    graphicsCard: '',
    storage: ''
 };

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private gameRequirementsService: GameRequirementsService, private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.requirementsForm = this.fb.group({
      os: ['', [Validators.required, Validators.maxLength(100)]],
      processor: ['', [Validators.required, Validators.maxLength(200)]],
      ram: ['', [Validators.required, Validators.maxLength(100)]],
      graphicsCard: ['', [Validators.required, Validators.maxLength(100)]],
      storage: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  get f() {
    return this.requirementsForm.controls;
  }

  onSubmit() 
  {
      if (this.requirementsForm.invalid) 
      {
        this.requirementsForm.markAllAsTouched();
        return;
      }
      const snackBarRef = this.snackBar.open(
        'Please wait',
        undefined,
        {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
      this.requirements = this.requirementsForm.value;
      const gameId = Number(this.route.snapshot.paramMap.get('gameId'));
      this.requirements.gameId = gameId;
      this.gameRequirementsService.uploadGameReq(this.requirements)
      .subscribe({
        next: (response: any) => 
        {
          snackBarRef.dismiss();
          this.snackBar.open
          (
            'Requirements added!',
            'Close',
            {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
          this.router.navigate(['/devHome']);
        },
        error: (error: any) => {
          this.snackBar.open(
            'Sorry, some error occurred!',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
        );
        }
      });
    }
  home()
  {
    this.router.navigate(['/devHome']);
  }
}
