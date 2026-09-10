import { Component } from '@angular/core';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { MatNavList } from "@angular/material/list";
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { DeveloperService } from '../developer.service';
import { ReturnGamesToDevDTO } from '../../models/ReturnGameToDev';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-upload-requests',
  standalone: true,
  imports: [MatSidenavContainer, MatNavList, MatSidenav, MatSidenavContent, MatToolbar, MatIcon,
    MatListModule, CommonModule, MatTableModule, MatButton
  ],
  templateUrl: './upload-requests.component.html',
  styleUrl: './upload-requests.component.css'
})
export class UploadRequestsComponent {
  constructor(private router:Router, private developerService: DeveloperService){}
  name = "";
  displayedColumns: string[] = ['name', 'price', 'genre','status','details'];
  pendingRequests: ReturnGamesToDevDTO[] = [];
  ngOnInit(){
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
  goToHome(){
    this.router.navigate(["/devHome"]);
  }
  goToEdit(gameId:number){
    this.router.navigate(["/editGame",gameId]);
  }
}
