import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EditGameDTO } from '../../models/EditGameDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditGameService } from '../edit-game.service';

@Component({
  selector: 'app-edit-game',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './edit-game.component.html',
  styleUrl: './edit-game.component.css'
})
export class EditGameComponent {
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
  gameId: number=0;
  gameForm: FormGroup;
  game: EditGameDTO = {
    id:0,
    name: '',
    price: 0,
    intro: '',
    description: '',
    genre: '',
    downloadLink: '',
    imageLink: '',
    discountPercentage: 0
  };
  selectedImage: File | null = null;
  imageRequired: boolean = false;
  selectedFile: File | null = null;
  fileRequired: boolean = false;
  disableButtons = false;

  constructor(private fb: FormBuilder, private editGameService: EditGameService,
    private router: Router, private snackBar:MatSnackBar, private route:ActivatedRoute) 
  {
    this.gameForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required, Validators.min(0)]],
      intro: ['', [Validators.required, Validators.maxLength(70)]],
      description: ['', [Validators.required]],
      genre: ['', [Validators.required, Validators.maxLength(100)]],
      downloadLink: [],
      imageLink: [],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit() 
  {
    this.gameId = Number(this.route.snapshot.paramMap.get('gameId'));
    this.editGameService.getGameById(this.gameId).subscribe({
      next: (game) => 
      {
        this.gameForm.patchValue({
          name: game.name,
          price: game.price,
          intro: game.intro,
          description: game.description,
          genre: game.genre,
          downloadLink: game.downloadLink,
          imageLink: game.imageLink,
          discountPercentage: game.discountPercentage
        });
        console.log(game.imageLink);
        this.game = game;
      },
      error: (error) => {
        console.error('Error getting game:', error);
      }
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

  saveEditedGame()
  {
    const snackBarRef = this.snackBar.open(
    'Updating game, please wait',
    undefined,
    {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }
    );
    this.disableButtons = true;
    this.game = this.gameForm.value;
    this.game.id = this.gameId;

    this.editGameService.saveEditedGame(this.game, this.selectedImage, this.selectedFile).subscribe({
      next: (response) => {
        snackBarRef.dismiss();
        this.snackBar.open('Game edited successfully!', 'Close', {
          duration: 3000,
           horizontalPosition: 'center',
           verticalPosition: 'top'
        });
        this.editReq();
      },

      error: (error) => {
        console.error('Error editing game:', error);
        this.snackBar.open(error.error?.message || 'Something went wrong!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.disableButtons = false;
      }
    });
  }
  onSubmit(){

  }
  editReq()
  {
    this.router.navigate(['/editReq',this.gameId]);
  }
  home(){
    this.router.navigate(['/devHome']);
  }
}
