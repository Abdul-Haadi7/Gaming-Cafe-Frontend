import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-rejection-reason',
  standalone: true,
   imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './rejection-reason.component.html',
  styleUrl: './rejection-reason.component.css'
})
export class RejectionReasonComponent {
  rejectionReason: string = '';

  constructor(
    public dialogRef: MatDialogRef<RejectionReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submitReason() {

    this.dialogRef.close({
      confirmed : true,
      reason: this.rejectionReason
    });

  }

  cancel() {

    this.dialogRef.close({
      confirmed: false
    });

  }
}
