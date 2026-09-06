import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EditGameDTO } from '../../models/EditGameDTO';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { UploadGameService } from '../../upload-game/upload-game.service';
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
  genres: string[] = ['Action', 'Fighting', 'Racing', 'Puzzle', 'RPG', 'Sports', 'Strategy'];
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


  constructor(private fb: FormBuilder, private editGameService: EditGameService,
    private router: Router, private snackBar:MatSnackBar, private route:ActivatedRoute) 
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

  ngOnInit() 
  {
    this.gameId = Number(this.route.snapshot.paramMap.get('gameId'));
    this.editGameService.getGameById(this.gameId).subscribe({
      next: (game) => 
      {
        console.log(this.game);
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
      },
      error: (error) => {
        console.error('Error getting game:', error);
      }
    });
  }

  get f() {
    return this.gameForm.controls;
  }
  saveEditedGame()
  {
    const snackBarRef = this.snackBar.open(
    'Please wait',
    undefined,
    {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }
    );
    this.game = this.gameForm.value;
    this.game.id = this.gameId;

    console.log(this.game);

    this.editGameService.saveEditedGame(this.game, this.gameId).subscribe({
      next: (response) => {
        snackBarRef.dismiss();
        this.snackBar.open('Game edited successfully!', 'Close', {
          duration: 3000,
           horizontalPosition: 'center',
           verticalPosition: 'top'
        });
      },

      error: (error) => {
        console.error('Error editing game:', error);

        this.snackBar.open(
          error.error?.message || 'Game could not be edited!',
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
