import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatToolbar],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
   name: string = '';
    constructor(private adminService: AdminService) {}
    ngOnInit(): void 
    {
      this.getName();
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
}
