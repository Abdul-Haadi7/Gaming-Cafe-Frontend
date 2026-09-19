import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from "@angular/material/form-field";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';
import { AdminService } from '../admin.service';

import { ReturnAdminToSuperAdmin } from '../../models/ReturnAdminToSuperAdmin';

@Component({
  selector: 'app-view-admins',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
      MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatOption],
  templateUrl: './view-admins.component.html',
  styleUrl: './view-admins.component.css'
})
export class ViewAdminsComponent {
  constructor(private router:Router, private adminService:AdminService, private snackBar:MatSnackBar){}
  name = '';
  allAdmins: ReturnAdminToSuperAdmin[] = [];
  filteredAdmins: ReturnAdminToSuperAdmin[] = [];
  displayedColumns: string[] = ['name', 'email','phone', 'permissions','status','actions'];

  ngOnInit(){
    this.getName();
    this.getAllAdmins();
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

  getAllAdmins(){
    this.adminService.fetchAllAdmins().subscribe({
      next: (result)=>{
        this.allAdmins = result;
        this.filteredAdmins = result;
      },
      error: (err) =>{
        console.log("Could not get admins");
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
  goToCust(){
    this.router.navigate(['/viewCust']);
  }
  goToAddAdmin(){
    this.router.navigate(['/addAdmin']);
  }
  searchAdmin(searchName:string){
    let temp = [...this.allAdmins];
    temp = temp.filter(admin => admin.name.toLowerCase().includes(searchName.trim().toLowerCase()));
    this.filteredAdmins = temp;
  }

  blockAdmin(admin:ReturnAdminToSuperAdmin)
  {
    const confirmed = confirm(
      `Are you sure you want to block "${admin.name}"?`
    );admin
    if (!confirmed)
    {
      return;
    }
    this.adminService.blockAdmin(admin.id).subscribe({
      next: (result) => {
         this.snackBar.open("User blocked!", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        admin.isActive = false;
      },
      error:(err)=>{
        console.log("Coud not block user! "+err);
      }
    });
  }
  unblockAdmin(admin:ReturnAdminToSuperAdmin)
  {
    const confirmed = confirm(
      `Are you sure you want to unblock "${admin.name}"?`
    );
    if (!confirmed)
    {
      return;
    }
    this.adminService.unblockAdmin(admin.id).subscribe({
      next: (result) => {
         this.snackBar.open("User unblocked!", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        admin.isActive = true;
      },
      error:(err)=>{
        console.log("Coud not unblock user! "+err);
      }
    });
  }
}
