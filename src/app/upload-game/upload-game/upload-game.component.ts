import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

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

 genres: string[] = [
  '4X',
  'Action',
  'Action-Adventure',
  'Adventure',
  'Arcade',
  'Arena Shooter',
  'Auto Battler',
  'Battle Royale',
  'Beat ’em Up',
  'Board Game',
  'Bullet Hell',
  'Card Game',
  'Casual',
  'City Builder',
  'Clicker',
  'Collectathon',
  'Combat Racing',
  'Construction and Management',
  'Cricket',
  'Dating Sim',
  'Deck-Building',
  'Dungeon Crawler',
  'Educational',
  'Farming Sim',
  'Fighting',
  'First-Person Shooter (FPS)',
  'Flight Sim',
  'FMV',
  'Grand Strategy',
  'Hack and Slash',
  'Hidden Object',
  'Horror',
  'Interactive Fiction',
  'Life Sim',
  'Loot Shooter',
  'Management Sim',
  'Metroidvania',
  'Military Sim',
  'MOBA',
  'MMORPG',
  'MMO',
  'Music and Rhythm',
  'Open World',
  'Party Game',
  'Pinball',
  'Platformer',
  'Point-and-Click',
  'Political Sim',
  'Puzzle',
  'Racing',
  'Real-Time Strategy (RTS)',
  'Rhythm',
  'Roguelike',
  'Roguelite',
  'Role-Playing Game (RPG)',
  'Run and Gun',
  'Sandbox',
  'Shoot ’em Up',
  'Simulation',
  'Social Deduction',
  'Soulslike',
  'Sports',
  'Stealth',
  'Story-Rich',
  'Survival',
  'Survival Horror',
  'Tactical RPG',
  'Tactical Shooter',
  'Text-Based',
  'Third-Person Shooter (TPS)',
  'Tower Defense',
  'Trading Card Game (TCG)',
  'Train Sim',
  'Trivia',
  'Turn-Based Strategy',
  'Vehicle Sim',
  'Visual Novel',
  'Walking Simulator',
  'War Game',
  'Wargame',
  'Word Game',
  'World-Building',
  'Wrestling'
];

  gameId: number = 0;
  gameForm: FormGroup;
  selectedImage: File | null = null;
  imageRequired: boolean = false;
  selectedFile: File | null = null;
  fileRequired: boolean = false;

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

  constructor(
    private fb: FormBuilder, private gameService: UploadGameService, private router: Router, private snackBar: MatSnackBar) {
    this.gameForm = this.fb.group({
      name: ['',[Validators.required,Validators.maxLength(100)]],
      price: [null,[Validators.required,Validators.min(0)]],
      intro: ['',[Validators.required,Validators.maxLength(70)]],
      description: ['',[Validators.required]],
      genre: ['',[Validators.required,Validators.maxLength(100)]],
      discountPercentage: [0,[Validators.min(0),Validators.max(100)]]
    });
  }
  get f() {
    return this.gameForm.controls;
  }

  onImageSelected(event: Event) 
  {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }
    const extension = file.name.split('.').pop()?.toLowerCase();
    const extensionsAllowed = ['jpg', 'jpeg', 'png', 'webp'];

    if (!extension || !extensionsAllowed.includes(extension)) 
    {
      this.selectedImage = null;
      this.imageRequired = true;
      input.value = '';
      return;
    }
    this.selectedImage = file;
    this.imageRequired = false;
  }
  onFileSelected(event: Event) 
  {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    const extension = file.name.split('.').pop()?.toLowerCase();
    const extensions = ['exe', 'zip'];
    if (!extension || !extensions.includes(extension)) 
    {
      this.selectedFile = null;
      this.fileRequired = true;
      input.value = '';
      return;
    }

    this.selectedFile = file;
    this.fileRequired = false;
  }

  uploadGame() {
    if (this.gameForm.invalid) {
      this.gameForm.markAllAsTouched();
      return;
    }

    if (!this.selectedImage) {
      this.imageRequired = true;
      return;
    }
    if (!this.selectedFile) {
      this.fileRequired = true;
      return;
    }
    const snackBarRef = this.snackBar.open(
      'Uploading game, please wait',
      undefined,
      {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      }
    );

    this.game = this.gameForm.value;

    this.gameService.uploadGame(this.game, this.selectedImage, this.selectedFile).subscribe({
        next: (response: any) => {
          snackBarRef.dismiss();
          this.gameId = response.gameId;

          this.snackBar.open(
            'Game sent for approval!',
            'Close',
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
          
          this.router.navigate([
            '/addRequirements',
            this.gameId
          ]);

        },
        error: (error) => {
          snackBarRef.dismiss();
          console.error(
            'Error in uploading game:',error);
          this.snackBar.open(error.error?.message || 'Something went wrong!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });

  }

  home() {
    this.router.navigate(['/devHome']);
  }

}