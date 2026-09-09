import { CustomerService } from '../customer.service';
import { MatToolbar } from "@angular/material/toolbar";
import { Component, OnInit } from '@angular/core';
// import { GameService } from '../game.service'
import { Game } from '../../models/game';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatCard, MatCardContent, MatCardTitle, MatCardSubtitle, MatCardActions } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarRow } from "@angular/material/toolbar";
import { Router } from '@angular/router'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReturnGamesToCustomerDTO } from '../../models/ReturnGameToCustDTO';
import { getDiffieHellman } from 'crypto';
// import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent, MatCardTitle, MatCardSubtitle,
  MatGridListModule, MatIconModule, MatCardActions, MatFormFieldModule, MatButtonModule,
  MatInputModule, MatOption, MatSelectModule, MatToolbar, MatToolbarRow],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent 
{
   name: string = '';
   sortOrder = '';
   selectedGenre = '';
   allGenres: string[] = [];
   filteredGames: ReturnGamesToCustomerDTO[] = [];
   allGames: ReturnGamesToCustomerDTO[] = [];
   gamesInCart = 0;
   searchName='';
   filter='';
   
   constructor(private customerService: CustomerService,
    private snackBar:MatSnackBar, private router:Router
   ) {}   
    ngOnInit(): void 
    {
      this.getName();
      this.getAllGames();
      this.getCartCount();
    }
    getName() 
    {
       this.customerService.getName().subscribe({
        next: (result) => {
          this.name = result;
        },
        error: (err) => {
          console.error('Failed to get name:', err);
        }
      });
    }
    getAllGames()
    {
      this.customerService.getAllGames().subscribe({
            next: (result) => 
            {
              for(let game of result){
                game.rating = this.roundToTwoDecimal(game.rating);
              }
              this.allGames = result;
              this.filteredGames = [...this.allGames];
              console.log(this.allGames);
            },
            error: (err) => 
            {
              console.error('Failed to get name:', err);
            }
          });
    }
    getCartCount(){
      this.customerService.getCartCount().subscribe({
            next: (result) => 
            {
              this.gamesInCart = result;
            },
            error: (err) => 
            {
              console.error('Failed to get count:', err);
            }
          });
    }
  addToCart(gameId: number, gameName: string): void
  {
    this.customerService.addToCart(gameId).subscribe({
    next: (response) => 
      {
        this.gamesInCart++;
        this.snackBar.open(`"${gameName}" added to cart!`, 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
    },

    error: (error) => {
      console.error("Add to cart error:", error);
      let message = `Unable to add "${gameName}" to cart!`;

      if (error.status === 400) {
        message = error.error;
      }

      this.snackBar.open(message, 'Close', 
      {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
    });
  }
  imageError(event: Event) 
  {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/Images/default.jpg';
  }
  getDiscountedPrice(originalPrice: number, discountPercentage: number): number
  {
    const discounted = originalPrice - (originalPrice * discountPercentage / 100);
    return Math.round(discounted * 100) / 100;
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
    let games = [...this.allGames];
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
    else if (this.filter === 'owned') {
      games = games.filter(game => game.alreadyOwned == true);
    }
    else if (this.filter === 'notOwned') {
      games = games.filter(game => game.alreadyOwned == false);
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
  goToDetails(gameId:number)
  {
    this.router.navigate(['/gameDetails',gameId]);
  }
  goToCart(){
    this.router.navigate(['/cart']);
  }
  getUserId()
  {
    try 
    {
      const token = localStorage.getItem('token');
      if(token == null){
        return;
      }
      const payload = token.split('.')[0];
      const decodedPayload = JSON.parse(atob(payload));
      this.router.navigate(['/cart', decodedPayload.id]);
      return decodedPayload.role ?? null;

    } 
    catch (error)
    {
      console.error('Invalid token:', error);
      return null;

    }
  }
  roundToTwoDecimal(value: number): number 
  {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
