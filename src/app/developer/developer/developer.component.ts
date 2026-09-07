import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { DeveloperService } from '../developer.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReturnGamesToDevDTO } from '../../models/ReturnGameToDev';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
    MatListModule, MatCardModule, MatTableModule, CommonModule
  ],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent {
  name: string = '';
  devGames: ReturnGamesToDevDTO[] = [];
  activeGames: ReturnGamesToDevDTO[] = [];
  totalGameSold = 0;
  totalMoneyEarned = 0;
  discountedPrice = 0;
  constructor(private developerService: DeveloperService, private router: Router,
    private snackBar: MatSnackBar
  ) {}
    ngOnInit(): void 
    {
      this.getName();
      this.developerService.getGames().subscribe({
        next: (games) => 
        {
          this.devGames = games;
          this.activeGames = [];
          for(const game of this.devGames)
          {
            if (game.isActive)
            {
              this.activeGames.push(game);
            }
          }
          this.upateStats();
        },
        error: (error) => {
          console.error('Failed to get games:', error);
        }
      });
    }
    upateStats(){
      for (let game of this.devGames)
      {
        this.totalGameSold+= game.soldAmount;
        this.totalMoneyEarned+= game.earned;
      }
    }
    getName() 
    {
       this.developerService.getName().subscribe({
        next: (result) => {
          this.name = result;
        },
        error: (err) => {
          console.error('Failed to get name:', err);
        }
      });
  }
  displayedColumns: string[] = ['name', 'price', 'discount','sold', 'earned', 'rating', 'genre','actions'];
 

  editGame(game: ReturnGamesToDevDTO) 
  {
    this.router.navigate(['/editGame',game.id]);
  }

  deleteGame(game: ReturnGamesToDevDTO) 
  {
    const confirmed = confirm(
      `Are you sure you want to delete "${game.name}"?`
    );
    if (!confirmed)
    {
      return;
    }
    this.developerService.deleteGame(game.id).subscribe({
        next: (result) => 
        { 
            this.activeGames = this.activeGames.filter(g => g !== game);
            this.snackBar.open(
            'Game deleted!',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        },
        error: (err) => {
          console.error('Failed to get name:', err);
        }
    });
  }
  goToUploadGame() {
    this.router.navigate(['/uploadGame']);
  }
  getDiscountedPrice(originalPrice:number, discountPercentage:number)
  {
    return (originalPrice - (originalPrice * discountPercentage / 100)).toFixed(2);
  }
}