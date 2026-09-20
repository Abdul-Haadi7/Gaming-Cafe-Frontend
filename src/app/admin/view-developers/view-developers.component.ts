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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-view-developers',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
  MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
  MatFormFieldModule,MatInputModule,MatSelectModule,MatOption, MatMenuModule],
  templateUrl: './view-developers.component.html',
  styleUrl: './view-developers.component.css'
})
export class ViewDevelopersComponent {
  constructor(private adminService:AdminService, private router:Router,
    private snackBar:MatSnackBar
  ){}
  name = '';
  allDevs: ReturnDevsToAdmin[] = [];
  filteredDevs: ReturnDevsToAdmin[] = [];
  displayedColumns: string[] = ['name', 'email','phone', 'activeGamesCount','status'];
  userRole = '';
  ngOnInit(){
    this.getName();
    this.fetchAllDevs();
    this.getUserRole();
  }
  getUserRole()
  {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRole = payload.role;
    }
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
        this.filteredDevs = result;
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
  userIsSuperAdmin():boolean{
    return this.userRole == 'Super Admin';  
  }
  blockDev(dev:ReturnDevsToAdmin)
  {
       const confirmed = confirm(
      `Are you sure you want to block "${dev.name}"?`
      );
      if (!confirmed)
      {
        return;
      }
    this.adminService.blockDev(dev.id).subscribe({
      next: (result) => {
         this.snackBar.open("User blocked!", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        dev.isActive=false;
      },
      error:(err)=>{
        console.log("Coud not block user! "+err);
      }
    });
  }
  unblockDev(dev:ReturnDevsToAdmin)
  {
       const confirmed = confirm(
      `Are you sure you want to unblock "${dev.name}"?`
      );
      if (!confirmed)
      {
        return;
      }
    this.adminService.unblockDev(dev.id).subscribe({
      next: (result) => {
         this.snackBar.open("User unblocked!", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        dev.isActive=true;
      },
      error:(err)=>{
        console.log("Coud not unblock user! "+err);
      }
    });
  }
  searchDev(searchName:string)
  {
    let temp = [...this.allDevs];
    temp = temp.filter(cust => cust.name.toLowerCase().includes(searchName.trim().toLowerCase()));
    this.filteredDevs = temp;
  }
  goToAdmins(){
    this.router.navigate(['/viewAdmins']);
  }
  logOut(){
    this.router.navigate(['/login']);
  }
}
