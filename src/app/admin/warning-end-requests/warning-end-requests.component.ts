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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from "@angular/material/form-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';
import { ReturnWarningEndReq } from '../../models/ReturnWarningEndReq';
import { MatMenuModule } from '@angular/material/menu';
import { ChangePasswordDialogComponent } from '../../change-password-dialog/change-password-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-end-requests',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
      MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatOption, MatMenuModule],
  templateUrl: './warning-end-requests.component.html',
  styleUrl: './warning-end-requests.component.css'
})
export class WarningEndRequestsComponent {
  name='';
  
  allRequests: ReturnWarningEndReq[] = [];
  displayedColumns: string[] = ['game', 'developer','reason', 'note','actions'];
  userRole = '';
  constructor(private adminService:AdminService, private router:Router,
    private snackBar:MatSnackBar, private dialog:MatDialog){}

  ngOnInit(){
    this.getName();
    this.getReqs();
    this.getUserRole();
  }
  getReqs()
  {
    this.adminService.getWarningEndReqs().subscribe({
      next: (result) =>{
        this.allRequests = result;
        console.log(this.allRequests);
      },
      error: (err)=>{
        console.error('Failed to get requests:', err);
      }
    })
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
  goToUploadRequests(){
    this.router.navigate(['/uploadRequestsReceived']);
  }
  goToHome(){
    this.router.navigate(['/adminHome']);
  }
  goToallActiveWarnings(){
    this.router.navigate(['/allActiveWarnings']);
  }
  acceptRequest(req:ReturnWarningEndReq){
    this.adminService.approveReq(req.warningId).subscribe({
      next:(result) => 
      {
        this.snackBar.open("Request accepted", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.allRequests = this.allRequests.filter(request => request!=req)
      },
      error: (err) =>{
        console.error('Failed to accept request:', err);
      }
    });
  }
  rejectRequest(req:ReturnWarningEndReq){
    this.adminService.rejectEndWarningReq(req.warningId).subscribe({
      next:(result) => 
      {
        this.snackBar.open("Request rejected", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.allRequests = this.allRequests.filter(request => request!=req)
      },
      error: (err) =>{
        console.error('Failed to reject request:', err);
      }
    });
  }
  goToDevs(){
    this.router.navigate(['/viewDevs']);
  }
  goToCust(){
    this.router.navigate(['/viewCust']);
  }
  goToAdmins(){
    this.router.navigate(['/viewAdmins']);
  }
  userIsSuperAdmin():boolean{
    return this.userRole == 'Super Admin';  
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
