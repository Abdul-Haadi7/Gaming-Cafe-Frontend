import { Component, OnInit } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from "@angular/material/core";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { AdminService } from '../admin.service';
import { AddAdmin } from '../../models/AddAdmin';
import { Permission } from '../../models/Permissions';

function atLeastOneSelected(control: AbstractControl): ValidationErrors | null 
{
  const array = control as FormArray;
  return array.controls.some(c => c.value === true) ? null : { noPermissionSelected: true };
}

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule,
    MatListModule, MatCardModule, MatTableModule, CommonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOption,
    MatCheckboxModule, MatDividerModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent implements OnInit
{
  constructor(
    private router: Router,
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  addAdminForm!: FormGroup;
  errorMessage = '';
  name = '';
  permissions: Permission[] = [];  
  submitted = false;
  isSaving = false;

  ngOnInit()
  {
    this.buildForm();
    this.getName();
    this.getAdminPerms();
  }

  buildForm()
  {
    this.addAdminForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email,
                   Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      password: ['',[Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      permissions: this.formBuilder.array([], atLeastOneSelected)
    });
  }
  private buildPermissionControls()
  {
    this.permissionsArray.clear();
    this.permissions.forEach(() =>
      this.permissionsArray.push(this.formBuilder.control(false))
    );
  }

  get nameControl()  { return this.addAdminForm.get('name'); }
  get emailControl() { return this.addAdminForm.get('email'); }
  get phoneControl() { return this.addAdminForm.get('phone'); }

  get permissionsArray(): FormArray
  {
    return this.addAdminForm.get('permissions') as FormArray;
  }

  get selectedCount(): number
  {
    return this.permissionsArray.controls.filter(c => c.value === true).length;
  }

  get allSelected(): boolean
  {
    return this.permissions.length > 0 && this.selectedCount === this.permissions.length;
  }

  get showPermissionsError(): boolean
  {
    return this.permissionsArray.invalid && (this.permissionsArray.touched || this.submitted);
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

  getAdminPerms(){
    this.adminService.getAdminPerms().subscribe({
      next: (result) => {
        this.permissions = result;
        this.buildPermissionControls();
      },
      error: (err)=>{
        console.log("Failed to get permissions: "+err);
      }
    });
  }

  selectAllPermissions()
  {
    this.setAllPermissions(true);
  }

  clearAllPermissions()
  {
    this.setAllPermissions(false);
  }

  private setAllPermissions(value: boolean)
  {
    this.permissionsArray.setValue(this.permissions.map(() => value));
    this.permissionsArray.markAsTouched();
    this.permissionsArray.markAsDirty();
  }

  createAdmin(){
    this.submitted = true;
    this.errorMessage = '';

    if (this.addAdminForm.invalid) {
      this.addAdminForm.markAllAsTouched();
      return;
    }

    const value = this.addAdminForm.value;

    const admin: AddAdmin = {
      name: value.name.trim(),
      email: value.email.trim(),
      phone: value.phone.trim(),
      password: value.password.trim(),
      role: 'Admin',
      permissions: this.permissions.filter((_, i) => value.permissions[i] === true).map(p => p.id)
    };

    this.isSaving = true;

    console.log(admin);

    this.adminService.addAdmin(admin).subscribe({
      next: () => {
        this.isSaving = false;
        this.snackBar.open("Admin created!", 'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.goToAdmins();
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = err?.error?.message ?? err?.error ?? 'Failed to create admin. Please try again.';
        console.error('Failed to create admin:', err);
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
  goToWarningEndReqs(){
    this.router.navigate(['/warningEndRequestsReceived']);
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

}