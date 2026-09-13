import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-warning-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './request-dialog.component.html',
  styleUrl: './request-dialog.component.css'
})
export class RequestDialogComponent {

  requestNote: string = '';

  constructor(
    public dialogRef: MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  sendRequest() {
    this.dialogRef.close({
      confirmed: true,
      reason: this.requestNote
    });
  }

  cancel() {

    this.dialogRef.close({
      confirmed: false
    });

  }

}