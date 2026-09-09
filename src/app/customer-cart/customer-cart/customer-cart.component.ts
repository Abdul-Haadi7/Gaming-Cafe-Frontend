import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
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
import { CartGames } from '../../models/CartGames';
import { MatList, MatListItem } from '@angular/material/list';
import { CustomerCartService } from '../customer-cart.service';
import { CustomerService } from '../../customer/customer.service';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardContent, MatCardTitle, MatCardSubtitle,
  MatGridListModule, MatIconModule, MatCardActions, MatFormFieldModule, MatButtonModule,
  MatInputModule, MatOption, MatSelectModule, MatToolbar, MatToolbarRow,
MatList,MatListItem],
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent {
  constructor(private router:Router, private cartService: CustomerCartService,
    private snackBar:MatSnackBar, private customerService:CustomerService
  ){}
  gamesInCart=0;
  totalPrice=0;
  games: CartGames[] = [];

  ngOnInit(){
    this.cartService.getCartGames().subscribe({
      next:(result) => {
        this.games = result;
        this.totalPrice = this.getTotalPrice();
        this.getCartCount();
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
  goToGames(){
    this.router.navigate(['/customerHome']);
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
  deleteFromCart(gameId:number)
  {
    this.cartService.deleteGameFromCart(gameId).subscribe({
      next:(result)=>{
        this.snackBar.open(
            'Game deleted!',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        this.games = this.games.filter(game => game.id !== gameId);
        this.totalPrice = this.getTotalPrice();
        this.gamesInCart--;
      },
      error:(err)=>{
        alert(err.error?.message || err.error || 'Something went wrong');
      }
    })
  }
  getTotalPrice():number
  {
    let total = 0;
    for (let game of this.games) {
      total += game.price;
    }
    return total;
  }
  clearCart(){
    this.cartService.clearCart().subscribe({
      next:(result)=>{
        this.snackBar.open(
            'Cart cleared!',
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        this.games = [];
        this.totalPrice = 0;
        this.gamesInCart = 0;
      },
      error:(err)=>{
        alert(err.error?.message || err.error || 'Something went wrong');
      }
    })
  }
  checkOut()
  {
    this.cartService.checkOut().subscribe({
      next:(result)=>{
        this.snackBar.open(
          'Download started!',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
        this.games = [];
        this.totalPrice = 0;
      },
      error:(err)=>
      {
        alert(err.error?.message || err.error || 'Something went wrong');
      }
      })
  }
}
