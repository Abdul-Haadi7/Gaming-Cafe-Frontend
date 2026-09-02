import { Component, OnInit } from '@angular/core';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [MatToolbar,MatToolbarModule],
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit
{
  name: string = '';
  constructor(private superAdminService: SuperAdminService) {}
  ngOnInit(): void 
  {
    this.getName();
  }
  getName() 
  {
     this.superAdminService.getName().subscribe({
      next: (result) => {
        this.name = result;
      },
      error: (err) => {
        console.error('Failed to get name:', err);
      }
    });
  }
}
