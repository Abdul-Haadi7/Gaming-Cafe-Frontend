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
import { Warning } from '../../models/Warnings';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-active-warnings',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
    MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatOption, MatMenuModule],
  templateUrl: './active-warnings.component.html',
  styleUrl: './active-warnings.component.css'
})
export class ActiveWarningsComponent 
{
  name='';
  allWarnings: Warning[] = [];
  displayedColumns: string[] = ['name', 'developer','reason', 'issuedAt', 
    'requested', 'actions'];
  userRole = '';
  constructor(private router:Router, private adminService:AdminService,
    private snackBar: MatSnackBar
  ){}
  ngOnInit()
  {
    this.getName();
    this.getAllWarnings();
    this.getUserRole();
  }

  getName() 
  {
    this.adminService.getName().subscribe({
    next: (result) => {
        this.name = result;
    },
    error: (err) => {
      console.error('Failed to get name: ', err);
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
  getAllWarnings(){
    this.adminService.getAllActiveWarnings().subscribe({
      next:(result) =>{
        this.allWarnings = result;
      },
      error: (err) => {
        console.log('Failed to get warnings!: ',err);
      }
    });
  }
  goToUploadRequests(){
    this.router.navigate(['/uploadRequestsReceived']);
  }
  goToHome(){
    this.router.navigate(['/adminHome']);
  }
  goToWarningEndReqs(){
    this.router.navigate(['/warningEndRequestsReceived']);
  }
  endWarning(warning:Warning)
  {
    this.adminService.endWarning(warning).subscribe({
      next:(result)=>{
        this.snackBar.open("Warning ended!", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
        );
        this.allWarnings = this.allWarnings.filter(warn => warn!=warning)
      },
      error:(err)=>{
        console.log("Could not end warning! "+err);
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
}
