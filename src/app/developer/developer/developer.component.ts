import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [MatToolbar],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.css'
})
export class DeveloperComponent {
  name: string = '';
    constructor(private developerService: DeveloperService) {}
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
}
