import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ReturnCustomerToAdmin } from '../../models/ReturnCustomerToAdmin';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormField } from "@angular/material/form-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-view-customers',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
    MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatOption],
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.css'
})
export class ViewCustomersComponent {
 constructor(private adminService:AdminService, private router:Router){}
  name = '';
  allCust: ReturnCustomerToAdmin[] = [];
  displayedColumns: string[] = ['name', 'email','phone', 'gamesBoughtCount','status'];
  ngOnInit(){
    this.getName();
    this.fetchAllCust();
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
  fetchAllCust(){
    this.adminService.fetchAllCust().subscribe({
      next: (result) =>{
        this.allCust = result;
      },
      error: (err) => {
        console.log("Failed to get customers! "+err);
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
  goToDevs(){
    this.router.navigate(['/viewDevs']);
  }
}
