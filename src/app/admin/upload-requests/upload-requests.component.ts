import { Component } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { MatNavList } from "@angular/material/list";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { ReturnUploadReqToAdmin } from '../../models/ReturnUploadReqToAdminDTO';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { RejectionReasonComponent } from '../rejection-reason/rejection-reason.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ChangePasswordDialogComponent } from '../../change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-upload-requests',
  standalone: true,
  imports: [MatSidenavContainer, MatNavList, MatSidenav, MatSidenavContent, MatToolbar, MatIcon,
    MatListModule, CommonModule, MatTableModule, MatButton, MatButtonModule, MatMenuModule],
  templateUrl: './upload-requests.component.html',
  styleUrl: './upload-requests.component.css'
})
export class UploadRequestsReceived {
  constructor(private router:Router, private adminService:AdminService,
    private snackBar:MatSnackBar, private dialog:MatDialog
  ){}
  name="";
  pendingRequests: ReturnUploadReqToAdmin[] = [];
  userRole='';
  displayedColumns: string[] = ['name', 'price', 'genre','developer','details','actions'];
  ngOnInit(){
     this.adminService.getUploadRequests().subscribe({
        next: (req) => 
        {
          this.pendingRequests = req;
        },
        error: (error) => {
          console.error('Failed to get requests:', error);
        }
      });
      this.getName();
      this.getUserRole();
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
  getUserRole()
  {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userRole = payload.role;
    }
  }
  goToHome(){
    this.router.navigate(['/adminHome']);
  }
  goToDetails(gameId:number){
    this.router.navigate(['/gameDetails',gameId]);
  }
  goToWarningEndReq(){
    this.router.navigate(['/warningEndRequestsReceived']);
  }
  goToallActiveWarnings(){
    this.router.navigate(['/allActiveWarnings']);
  }
  approveRequest(request:ReturnUploadReqToAdmin){
    const confirmed = confirm("Are you sure you want to approve this game?");
    if (!confirmed)
    {
      return;
    }
     this.adminService.approveGame(request.id).subscribe({
        next: (req) => 
        {
          this.snackBar.open("Game approved", 'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
          this.pendingRequests = this.pendingRequests.filter(r => r.id !== request.id);
        },
        error: (error) => {
          console.error('Failed to approve game:', error);
        }
      });
  }
  rejectRequest(request: ReturnUploadReqToAdmin, reason: string){
  
     this.adminService.rejectGame(request.id,reason).subscribe({
        next: (req) => 
        {
          this.snackBar.open("Game rejected", 'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
          this.pendingRequests = this.pendingRequests.filter(r => r.id !== request.id);
        },
        error: (error) => {
          console.error('Failed to reject game:', error);
        }
      });
  }
  openReasonDialog(req: ReturnUploadReqToAdmin) 
  {
    const dialogRef = this.dialog.open(RejectionReasonComponent, {
      width: '450px',
      data: {
        req: req
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) 
      {
        this.rejectRequest(req,result.reason);
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
