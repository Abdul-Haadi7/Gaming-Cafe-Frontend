import { ReturnDevsToAdmin } from '../../models/ReturnDevsToAdmin';
import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { AdminService } from '../admin.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormField } from "@angular/material/form-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-view-developers',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
  MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
  MatFormFieldModule,MatInputModule,MatSelectModule,MatOption],
  templateUrl: './view-developers.component.html',
  styleUrl: './view-developers.component.css'
})
export class ViewDevelopersComponent {
  constructor(private adminService:AdminService, private router:Router){}
  name = '';
  allDevs: ReturnDevsToAdmin[] = [];
  displayedColumns: string[] = ['name', 'email','phone', 'activeGamesCount','status'];
  ngOnInit(){
    this.getName();
    this.fetchAllDevs();
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
  fetchAllDevs(){
    this.adminService.fetchAllDevs().subscribe({
      next: (result) =>{
        this.allDevs = result;
      },
      error: (err) => {
        console.log("Failed to get devs! "+err);
      }
    });
  }
  goToUploadRequests(){
    this.router.navigate(['/uploadRequestsReceived']);
  }
  goToHome(){
    this.router.navigate(['/adminHome']);
  }
  goToallActiveWarnings(){
    this.router.navigate(['/allActiveWarnings']);
  }
  goToWarningEndReqs(){
    this.router.navigate(['/warningEndRequestsReceived']);
  }
  goToCust(){
    this.router.navigate(['/viewCust']);
  }
}
