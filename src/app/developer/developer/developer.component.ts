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

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
    MatListModule, MatCardModule, MatTableModule
  ],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent {
  name: string = '';
    constructor(private developerService: DeveloperService, private router: Router) {}
    ngOnInit(): void 
    {
      this.getName();
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
  displayedColumns: string[] = ['name', 'price', 'sold', 'earned', 'rating', 'actions'];
  games = [
  { name: 'Tekken', price: 100, sold: 1, earned: 100, rating: 9.7 },
  { name: 'Street Fighter', price: 150, sold: 3, earned: 450, rating: 8.9 },
  { name: 'Mortal Kombat', price: 120, sold: 2, earned: 240, rating: 9.2 },
  ];

  editGame(game: any) {
    alert('Edit '+ game.name);
  }

  deleteGame(game: any) {
    alert('Delete '+ game.name);
  }
  goToUploadGame() {
    this.router.navigate(['/uploadGame']);
  }
}