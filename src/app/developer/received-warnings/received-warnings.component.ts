import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { DeveloperService } from '../developer.service';
import { MatSidenavContent, MatSidenavContainer, MatSidenav } from "@angular/material/sidenav";
import { MatIcon } from "@angular/material/icon";
import { Router } from '@angular/router';
import { MatListModule, MatNavList } from "@angular/material/list";
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Warning } from '../../models/Warnings';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';
import { SendWarningEndReqDTO } from '../../models/SendWarningEndReqDTO';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-received-warnings',
  standalone: true,
  imports: [MatSidenavContainer, MatNavList, MatSidenav, MatSidenavContent, MatToolbar, MatIcon,
      MatListModule, CommonModule, MatTableModule, MatButton, MatButtonModule
    ],
  templateUrl: './received-warnings.component.html',
  styleUrl: './received-warnings.component.css'
})
export class ReceivedWarningsComponent {
  constructor(private developerService:DeveloperService,private router:Router, 
    private dialog:MatDialog, private snackBar:MatSnackBar){}
  name='';
  warnings: Warning[] = [];
  displayedColumns: string[] = ['name', 'reason', 'issuedAt','actions'];
  ngOnInit(){
    this.getName();
    this.getRecivedWarnings();
    console.log(this.warnings);
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
  getRecivedWarnings(){
    this.developerService.getReceivedWarnings().subscribe({
      next: (result) => {
        this.warnings = result;
        console.log(this.warnings);
      },
      error: (err) => {
        console.error('Failed to get warnings:', err);
      }
    });
  }
  goToHome(){
    this.router.navigate(["/devHome"]);
  }
  goToUploadRequests(){
    this.router.navigate(['/uploadRequestsSent']);
  }
  openWarningDialog(warning: Warning) 
  {
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      width: '450px',
      data: {
        warning: warning
      }
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      if (result?.confirmed) 
      {
        const req: SendWarningEndReqDTO = {
          warningId: warning.id,
          requestNote: result.reason
        }
        this.developerService.sendRequest(req).subscribe({
          next: (result) => 
          {
            this.snackBar.open("Request send!", 'Close',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              }
            );
            warning.requestedToEnd = true;
          },
          error: (err) => {
            console.error('Failed to send request:', err);
          }
        });

      }
    });

  }
}
