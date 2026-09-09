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
import { MatFormField } from "@angular/material/form-field";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
    MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
  MatFormFieldModule,MatInputModule,MatSelectModule,MatOption],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent {
  name: string = '';
  devGames: ReturnGamesToDevDTO[] = [];
  activeGames: ReturnGamesToDevDTO[] = [];
  filteredGames: ReturnGamesToDevDTO[] = [];
  totalGameSold = 0;
  totalMoneyEarned = 0;
  discountedPrice = 0;
  sortOrder: string = "";
  searchName:string="";
  filter:string="";
  constructor(private developerService: DeveloperService, private router: Router,
    private snackBar: MatSnackBar
  ) {}
    ngOnInit(): void 
    {
      this.getName();
      this.developerService.getGames().subscribe({
        next: (games) => 
        {
          for(let game of games){
            game.rating = this.roundToTwoDecimal(game.rating);
          }
          this.devGames = games;
          this.activeGames = [];
          this.devGames = games;
          this.activeGames = this.devGames.filter(game => game.isActive);
          this.filteredGames = [...this.activeGames];
          console.log(this.filteredGames);
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
  displayedColumns: string[] = ['name', 'price', 'discount','sold', 'earned', 'rating', 
    'genre','availability','actions'];
 

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
  getDiscountedPrice(originalPrice: number, discountPercentage: number): number
  {
    const discounted = originalPrice - (originalPrice * discountPercentage / 100);
    return Math.round(discounted * 100) / 100;
  }
  toggleAvailability(game:ReturnGamesToDevDTO)
  {
    this.developerService.toggleAvailabiity(game.id).subscribe({
      next: (result) => 
      { 
        this.snackBar.open(
          'Availability changed!',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
        game.isPublic = !game.isPublic;
      },
      error: (err) => 
      {
        this.snackBar.open(
          'Failed to change availability!'+err,
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

  searchGames(searched: string): void 
  {
    this.searchName = searched.trim().toLowerCase();
    this.applyFilters();
  }

  sortGames(sortValue: string): void {
    this.sortOrder = sortValue;
    this.applyFilters();
  }

  filterOutGames(filterValue: string): void {
    this.filter = filterValue;
    this.applyFilters();
  }

  applyFilters(): void 
  {
    let games = [...this.activeGames];
    // Search
    if (this.searchName) 
    {
      games = games.filter(game =>
        game.name.toLowerCase().includes(this.searchName)
      );
    }
    // Sort
    if (this.sortOrder === 'priceLowHigh') {
      games.sort((a, b) =>
        this.getDiscountedPrice(a.price, a.discountPercentage) -
        this.getDiscountedPrice(b.price, b.discountPercentage)
      );
    }
    else if (this.sortOrder === 'priceHighLow') {
      games.sort((a, b) =>
        this.getDiscountedPrice(b.price, b.discountPercentage) -
        this.getDiscountedPrice(a.price, a.discountPercentage)
      );
    }
    else if (this.sortOrder === 'ratingLowHigh') {
      games.sort((a, b) => a.rating - b.rating);
    }
    else if (this.sortOrder === 'ratingHighLow') {
      games.sort((a, b) => b.rating - a.rating);
    }
    else if (this.sortOrder === 'soldLowHigh') {
      games.sort((a, b) => a.soldAmount - b.soldAmount);
    }
    else if (this.sortOrder === 'soldHighLow') {
      games.sort((a, b) => b.soldAmount - a.soldAmount);
    }
    else if (this.sortOrder === 'earnedLowHigh') {
      games.sort((a, b) => a.earned - b.earned);
    }
    else if (this.sortOrder === 'earnedHighLow') {
      games.sort((a, b) => b.earned - a.earned);
    }
    
    // Filter
    if (this.filter === 'discounted') {
      games = games.filter(game => game.discountPercentage > 0);
    }
    else if (this.filter === 'notDiscounted') {
      games = games.filter(game => game.discountPercentage <= 0);
    }
    else if (this.filter === 'public') {
      games = games.filter(game => game.isPublic === true);
    }
    else if (this.filter === 'private') {
      games = games.filter(game => game.isPublic === false);
    }
    else if (this.filter === 'warning') {
      games = games.filter(game => game.hasWarning === true);
    }
    else if (this.filter === 'noWarning') {
      games = games.filter(game => game.hasWarning === false);
    }

    this.filteredGames = games;
  }

  clearSort(): void {
  this.sortOrder = '';
  this.applyFilters();
  }

  clearFilter(): void {
    this.filter = '';
    this.applyFilters();
  }
  roundToTwoDecimal(value: number): number 
  {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}