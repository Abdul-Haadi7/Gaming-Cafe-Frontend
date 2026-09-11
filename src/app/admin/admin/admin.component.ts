import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
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
import { AdminService } from '../admin.service';
import { ReturnGamesToAdminDTO } from '../../models/ReturnGameToAdmin';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
      MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatOption],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
   name: string = '';
   activeReqCount = 0;
   activeWarnings = 0;
   endWarningReqCount = 0;
   allActiveGames: ReturnGamesToAdminDTO[] = []
   filteredGames: ReturnGamesToAdminDTO[] = []
   displayedColumns: string[] = ['name', 'developer','price', 'discount', 'rating', 
    'genre','availability','actions'];
    sortOrder = '';
    filter = '';
    searchName = '';
    constructor(private adminService: AdminService, private router:Router,
      private dialog:MatDialog, private snackBar:MatSnackBar) {}
    ngOnInit(): void 
    {
      this.getName();
      this.getReqCount();
      this.getAllGames();
    }
    getName() 
    {
       this.adminService.getName().subscribe({
        next: (result) => {
          this.name = result;
        },
        error: (err) => {
          console.error('Failed to get name:', err);
        }
      });
    }
    getReqCount() 
    {
      this.adminService.getReqCount().subscribe({
        next: (result) => {
        this.activeReqCount = result;
        },
        error: (err) => {
          console.error('Failed to get name:', err);
        }
      });
    }
    getAllGames() 
    {
      this.adminService.getAllGames().subscribe({
        next: (result) => {
        this.allActiveGames = result;
        this.filteredGames = [...this.allActiveGames];
        },
        error: (err) => {
          console.error('Failed to get name:', err);
        }
      });
    }
    goToUploadRequests(){
      this.router.navigate(['/uploadRequestsReceived']);
    }
    getDiscountedPrice(originalPrice: number, discountPercentage: number): number
    {
      const discounted = originalPrice - (originalPrice * discountPercentage / 100);
      return Math.round(discounted * 100) / 100;
    }
  openWarningDialog(game: ReturnGamesToAdminDTO) {

    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '450px',
      data: {
        game: game
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result?.confirmed) {

        this.adminService.sendWarning(game.id,result.reason).subscribe({
          next: (result) => 
          {
            this.snackBar.open("Warning send!", 'Close',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              }
            );
          game.hasWarning = true;
          },
          error: (err) => {
            console.error('Failed to get name:', err);
          }
        });

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
    let games = [...this.allActiveGames];
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
}
