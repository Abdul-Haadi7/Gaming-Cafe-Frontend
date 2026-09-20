import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { DeveloperService } from '../developer.service';
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

@Component({
  selector: 'app-warning-end-requests',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
  MatListModule, MatCardModule, MatTableModule, CommonModule, MatFormField,
  MatFormFieldModule,MatInputModule,MatSelectModule,MatOption, MatMenuModule],
  templateUrl: './warning-end-requests.component.html',
  styleUrl: './warning-end-requests.component.css'
})
export class WarningEndRequestsSentComponent 
{
  name = '';
  allReqs: ReturnWarningEndReq[] = [];

  displayedColumns: string[] = ['game', 'reason', 'note','status','actions'];
  constructor(private router:Router, private developerService:DeveloperService){}
  ngOnInit(){
    this.getName();
    this.getReqs();
  }
  getName() 
  {
    this.developerService.getName().subscribe({
    next: (result) => {
      this.name = result;
    },
    error: (err) => {
      console.error('Failed to get name:', err);
    }
    });
  }
  getReqs(){
    this.developerService.getEndWarningReqs().subscribe({
      next:(result)=>{
        this.allReqs = result;
        console.log(this.allReqs);
      },
      error:(err) =>{
        console.error('Failed to get requests:', err);
      }
    });
  }
  goToHome(){
    this.router.navigate(["/devHome"]);
  }
  goToUploadRequests(){
    this.router.navigate(['/uploadRequestsSent']);
  }
  goToWarnings(){
    this.router.navigate(['/receivedWarnings']);
  }
  doNotShowAgain(request:ReturnWarningEndReq){
    this.developerService.markWarningEndReqAsDontShow(request.id).subscribe({
      next:(result)=>{
        this.allReqs = this.allReqs.filter(req => req!=request);
      },
      error: (err) => {
        console.error('Failed to mark as don`t show:', err);
      }
    });
  }
  logOut(){
    this.router.navigate(['/login']);
  }
}
