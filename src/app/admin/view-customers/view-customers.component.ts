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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../../change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-view-customers',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
    MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatOption, MatMenuModule],
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.css'
})
export class ViewCustomersComponent {
 constructor(private adminService:AdminService, private router:Router,
  private snackBar:MatSnackBar, private dialog:MatDialog){}
  name = '';
  allCust: ReturnCustomerToAdmin[] = [];
  filteredCust: ReturnCustomerToAdmin[] = [];
  displayedColumns: string[] = ['name', 'email','phone', 'gamesBoughtCount','status'];
  userRole = '';
  ngOnInit(){
    this.getUserRole()
    this.getName();
    this.fetchAllCust();
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
  fetchAllCust(){
    this.adminService.fetchAllCust().subscribe({
      next: (result) =>{
        this.allCust = result;
        this.filteredCust = result;
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
  userIsSuperAdmin():boolean{
    return this.userRole == 'Super Admin';  
  }
  blockCust(cust:ReturnCustomerToAdmin)
  {
    const confirmed = confirm(
      `Are you sure you want to block "${cust.name}"?`
    );
    if (!confirmed)
    {
      return;
    }
    this.adminService.blockCust(cust.id).subscribe({
      next: (result) => {
         this.snackBar.open("User blocked!", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        cust.isActive = false;
      },
      error:(err)=>{
        console.log("Coud not block user! "+err);
      }
    });
  }
  unblockCust(cust:ReturnCustomerToAdmin)
  {
    const confirmed = confirm(
      `Are you sure you want to unblock "${cust.name}"?`
    );
    if (!confirmed)
    {
      return;
    }
    this.adminService.unblockCust(cust.id).subscribe({
      next: (result) => {
         this.snackBar.open("User unblocked!", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        cust.isActive = true;
      },
      error:(err)=>{
        console.log("Coud not unblock user! "+err);
      }
    });
  }
  searchCust(searchName:string)
  {
    let temp = [...this.allCust];
    temp = temp.filter(cust => cust.name.toLowerCase().includes(searchName.trim().toLowerCase()));
    this.filteredCust = temp;
  }
  goToAdmins(){
    this.router.navigate(['/viewAdmins']);
  }
  logOut(){
    this.router.navigate(['/login']);
  }
  openChangePassDialog() 
  {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '450px',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) 
      {
        dialogRef.close();
      }
    });

  }
}
