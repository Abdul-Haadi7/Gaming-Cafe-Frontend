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
  templateUrl: './warning-dialog.component.html',
  styleUrl: './warning-dialog.component.css'
})
export class WarningDialogComponent {

  warningReason: string = '';

  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  sendWarning() {

    this.dialogRef.close({
      confirmed: true,
      reason: this.warningReason
    });

  }

  cancel() {

    this.dialogRef.close({
      confirmed: false
    });

  }

}