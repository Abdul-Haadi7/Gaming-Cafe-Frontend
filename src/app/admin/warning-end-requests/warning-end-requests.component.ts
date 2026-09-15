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
import { ReturnWarningEndReqToAdmin } from '../../models/ReturnWarningEndReqToAdmin';

@Component({
  selector: 'app-warning-end-requests',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
      MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatOption],
  templateUrl: './warning-end-requests.component.html',
  styleUrl: './warning-end-requests.component.css'
})
export class WarningEndRequestsComponent {
  name='';
  
  allRequests: ReturnWarningEndReqToAdmin[] = [];
  displayedColumns: string[] = ['game', 'developer','reason', 'note','actions'];
  constructor(private adminService:AdminService, private router:Router,
    private snackBar:MatSnackBar){}

  ngOnInit(){
    this.getName();
    this.getReqs();
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
  acceptRequest(req:ReturnWarningEndReqToAdmin){
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
}
