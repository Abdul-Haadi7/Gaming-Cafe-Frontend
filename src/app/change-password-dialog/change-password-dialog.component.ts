import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../login/auth.service';

@Component({
selector: 'app-change-password-dialog',
standalone: true,

imports: [
FormsModule,
MatDialogModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule,
MatIconModule
],

templateUrl: './change-password-dialog.component.html',
styleUrl: './change-password-dialog.component.css'
})
export class ChangePasswordDialogComponent {

currentPassword: string = '';
newPassword: string = '';
confirmNewPassword: string = '';

hideCurrentPassword: boolean = true;
hideNewPassword: boolean = true;
hideConfirmPassword: boolean = true;


constructor(
private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
private authService: AuthService,
private snackBar: MatSnackBar
) {}

changePassword() {

if (
  !this.currentPassword.trim() ||
  !this.newPassword.trim() ||
  !this.confirmNewPassword.trim()
) {
  this.snackBar.open(
    'All fields are required!',
    'Close',
    {   duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'  
    }
  );

  return;
}

if (this.newPassword !== this.confirmNewPassword) {

  this.snackBar.open(
    'New password and confirmed password does not match!',
    'Close',
    {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }
  );

  return;
}

this.authService.changePassword(this.currentPassword.trim(),this.newPassword.trim(),
this.confirmNewPassword.trim()).subscribe({
  next:(result)=>{
    this.snackBar.open(
        'Password changed!',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }
      );
      this.dialogRef.close({
        confirmed: true
      });
  },
  error: (error) => {

    this.snackBar.open(
      error.error?.message || 'Unable to change password!',
      'Close',
      {   
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top' 
      }
    );

  }
});

}

cancel() {

this.dialogRef.close({
  confirmed: false
});

}
}
