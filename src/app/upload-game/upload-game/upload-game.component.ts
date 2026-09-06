import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { UploadGameService } from '../upload-game.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-game',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './upload-game.component.html',
  styleUrls: ['./upload-game.component.css']
})
export class UploadGameComponent {
  genres: string[] = ['Action', 'Fighting', 'Racing', 'Puzzle', 'RPG', 'Sports', 'Strategy'];
  gameId: number=0;
  gameForm: FormGroup;
  game: Game = {
    name: '',
    price: 0,
    intro: '',
    description: '',
    genre: '',
    downloadLink: '',
    imageLink: '',
    discountPercentage: 0
  };

  constructor(private fb: FormBuilder, private gameService: UploadGameService,
    private router: Router, private snackBar:MatSnackBar,) 
  {
    this.gameForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(0)]],
      intro: ['', [Validators.required, Validators.maxLength(70)]],
      description: ['', [Validators.required]],
      genre: ['', [Validators.required, Validators.maxLength(100)]],
      downloadLink: ['', [Validators.required, Validators.maxLength(100)]],
      imageLink: ['', [Validators.required, Validators.maxLength(100)]],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  get f() {
    return this.gameForm.controls;
  }

  onSubmit() 
  {
    if (this.gameForm.invalid) 
    {
      this.gameForm.markAllAsTouched();
      return;
    }
    this.game = this.gameForm.value;
  }
  uploadGame()
  {
    if (this.gameForm.invalid) 
    {
      this.gameForm.markAllAsTouched();
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
    this.game = this.gameForm.value;
    this.gameService.uploadGame(this.game).subscribe({
      next: (response: any) => 
      {
        snackBarRef.dismiss();
        this.gameId = response.gameId;
        this.snackBar.open('Game sent for approval!', 'Close', 
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['/addRequirements',this.gameId]);
      },
      error: (error) => 
      {
        console.error('Error uploading game:', error);
        this.snackBar.open('Sorry, some error occured! '+error, 'Close', 
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        alert('Failed to upload game. Please try again.');
      }
    });
  }
  addReq()
  {
    if (this.gameForm.invalid) 
    {
      this.gameForm.markAllAsTouched();
      return;
    }
    this.router.navigate(['/addRequirements',this.gameId]);
  }
  home()
  {
    this.router.navigate(['/devHome']);
  }
}