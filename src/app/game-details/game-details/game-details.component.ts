import { Component } from '@angular/core';
import { CustomerService } from '../../customer/customer.service';
import { ReturnGamesToCustomerDTO } from '../../models/ReturnGameToCustDTO';
import { ActivatedRoute } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardContent } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetRequirementsDTO } from '../../models/getRequirementsDTO';
import { EditRequirementsService } from '../../edit-requirements/edit-requirements.service';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule,MatIcon, MatCard, MatCardContent,FormsModule,MatSliderModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.css'
})
export class GameDetailsComponent 
{
  game: ReturnGamesToCustomerDTO=
  {
    id:0,
    name:'',
    price:0,
    intro:'',
    description: '',
    genre: '',
    downloadLink: '',
    imageLink: '',
    discountPercentage: 0,
    developerName:'',
    rating: 0,
    alreadyOwned: true
  }
  gameId=0;
  userRating=0;
  tempRating=0;
  gameReq:GetRequirementsDTO={
    os:'',
    processor:'',
    ram:'',
    graphicsCard:'',
    storage: ''
  }
  viewerRole='';
  constructor(private customerService: CustomerService, private route:ActivatedRoute,
    private snackBar:MatSnackBar){}
  ngOnInit()
  {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.viewerRole = payload.role;
    }
    const idParam = this.route.snapshot.paramMap.get('gameId');
    this.gameId = idParam ? Number(idParam) : 0;

    this.customerService.getGameById(this.gameId).subscribe({
      next: (result) => {
        result.rating = this.roundToTwoDecimal(result.rating);
        this.game = result;
      },
      error: (err) => 
      {
        console.error('Failed to get game:', err);
      }
    });
    if(this.viewerIsCustomer()){
      this.customerService.getRatingGiven(this.gameId).subscribe({
        next: (result) => {
          this.userRating = this.roundToTwoDecimal(result);
        },
        error: (err) => 
          {
            console.error('Failed to get game:', err);
          }
        });
    }
    this.customerService.getGameReq(this.gameId).subscribe({
      next: (req) => 
      {
        if (req == null) 
        {
          return;
        }
        this.gameReq = req;
      },
      error: (error) => 
      {
        console.error('Error getting game:', error);
      }
    });
  }
 
  rateGame(gameId: number, ratingGiven: number)
  {
    this.customerService.rateGame(gameId,ratingGiven).subscribe({
      next: (response) => 
      {
        this.userRating = this.roundToTwoDecimal(ratingGiven);
        this.snackBar.open("Rating saved!", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
        );
      },

    error: (error) => {
      console.error("Add to cart error:", error);
      let message = "Unable to save rating";

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
  getDiscountedPrice(originalPrice: number, discountPercentage: number): number
  {
    const discounted = originalPrice - (originalPrice * discountPercentage / 100);
    return Math.round(discounted * 100) / 100;
  }
  addToCart(gameId: number, gameName: string): void
  {
    this.customerService.addToCart(gameId).subscribe({
    next: (response) => 
      {
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
  roundToTwoDecimal(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
  imageError(event: Event) 
  {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/Images/default.jpg';
  }
  viewerIsCustomer():boolean{
    return this.viewerRole == 'Customer';  
  }
}
