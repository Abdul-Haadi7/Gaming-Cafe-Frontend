import { Component } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { MatNavList } from "@angular/material/list";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { ReturnGamesToDevDTO } from '../../models/ReturnGameToDev';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { DeveloperService } from '../../developer/developer.service';
import { ReturnUploadReqToAdmin } from '../../models/ReturnUploadReqToAdminDTO';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-requests',
  standalone: true,
  imports: [MatSidenavContainer, MatNavList, MatSidenav, MatSidenavContent, MatToolbar, MatIcon,
    MatListModule, CommonModule, MatTableModule, MatButton],
  templateUrl: './upload-requests.component.html',
  styleUrl: './upload-requests.component.css'
})
export class UploadRequestsReceived {
  constructor(private router:Router, private adminService:AdminService,
    private snackBar:MatSnackBar
  ){}
  name="";
  pendingRequests: ReturnUploadReqToAdmin[] = [];
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
  }
  goToHome(){
    this.router.navigate(['/adminHome']);
  }
  goToDetails(gameId:number){
    this.router.navigate(['/gameDetails',gameId]);
  }
  approveRequest(request:ReturnUploadReqToAdmin){
    const confirmed = confirm(
          "Are you sure you want to approve this game?"
        );
        if (!confirmed)
        {
          return;
        }
     this.adminService.approveGame(request.id,true).subscribe({
        next: (req) => 
        {
          this.pendingRequests = this.pendingRequests.filter(r => r.id !== request.id);
          this.snackBar.open("Game approved", 'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
        },
        error: (error) => {
          console.error('Failed to approve game:', error);
        }
      });
  }
  rejectRequest(request:ReturnUploadReqToAdmin){
    const confirmed = confirm(
          "Are you sure you want to reject this game?"
        );
        if (!confirmed)
        {
          return;
        }
     this.adminService.approveGame(request.id,false).subscribe({
        next: (req) => 
        {
          this.pendingRequests = this.pendingRequests.filter(r => r.id !== request.id);
          this.snackBar.open("Game rejected", 'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }
        );
        },
        error: (error) => {
          console.error('Failed to reject game:', error);
        }
      });
  }
}
