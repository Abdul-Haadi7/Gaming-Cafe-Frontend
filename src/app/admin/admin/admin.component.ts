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
    constructor(private adminService: AdminService, private router:Router) {}
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
    goToUploadRequests(){
      this.router.navigate(['/uploadRequestsReceived']);
    }
}
