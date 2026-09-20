import { Component } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { MatNavList } from "@angular/material/list";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { DeveloperService } from '../developer.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { ReturnUploadReqToDev } from '../../models/ReturnUploadReqToDev';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-upload-requests',
  standalone: true,
  imports: [MatSidenavContainer, MatNavList, MatSidenav, MatSidenavContent, MatToolbar, MatIcon,
    MatListModule, CommonModule, MatTableModule, MatButton, MatIconModule, MatButtonModule, MatMenuModule
  ],
  templateUrl: './upload-requests.component.html',
  styleUrl: './upload-requests.component.css'
})
export class UploadRequestsComponent {
  constructor(private router:Router, private developerService: DeveloperService){}
  name = "";
  displayedColumns: string[] = ['name', 'price', 'genre','status','actions'];
  pendingRequests: ReturnUploadReqToDev[] = [];
  ngOnInit(){
    this.getName();
    this.getUploadReq();
  }
  getUploadReq(){
    this.developerService.getUploadRequests().subscribe({
        next: (req) => 
        {
          this.pendingRequests = req;
        },
        error: (error) => {
          console.error('Failed to get requests:', error);
        }
      });
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
  goToHome(){
    this.router.navigate(["/devHome"]);
  }
  goToEdit(gameId:number){
    this.router.navigate(["/editGame",gameId]);
  }
  goToWarnings(){
    this.router.navigate(['/receivedWarnings']);
  }
  markWarningEndReqAsDontShow(request:ReturnUploadReqToDev){
    this.developerService.markWarningEndReqAsDontShow(request.id).subscribe({
      next:(result)=>{
        this.pendingRequests = this.pendingRequests.filter(req => req!=request);
      },
      error: (err) => {
        console.error('Failed to mark as don`t show:', err);
      }
    });
  }
  goToWarningEndReqs(){
    this.router.navigate(['/warningEndReqs']);
  }
  logOut(){
    this.router.navigate(['/login']);
  }
}
