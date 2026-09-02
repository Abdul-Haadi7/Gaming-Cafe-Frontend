import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../login/login.service';
import { CommonModule } from '@angular/common';
import { NewAccService } from '../new-acc.service';
import { NewAccDTO } from '../new-acc.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-acc',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-acc.component.html',
  styleUrl: './new-acc.component.css'
})
export class NewAccComponent implements OnInit {
  newAccForm: FormGroup = new FormGroup({});
  errorMessage = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private newAccService: NewAccService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void 
  {
    this.newAccForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      realName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      password: ['', Validators.required],
      role: ['Customer', Validators.required]
    });
  }

 onCreateAcc(): void 
 {
    if (this.newAccForm.invalid) {
      this.newAccForm.markAllAsTouched();
      return;
    }

    const dto: NewAccDTO = {
      Name: this.newAccForm.value.realName,
      Email: this.newAccForm.value.email,
      Phone: this.newAccForm.value.phone,
      password: this.newAccForm.value.password,
      role: this.newAccForm.value.role
    };

    this.newAccService.createAccount(dto).subscribe({
      next: (response: any) => 
      {
          const role = this.authService.getRole();
          if (role === 'Developer') 
          {
            this.router.navigate(['/devHome']);
          }
          else if (role === 'Customer') 
          {
            this.router.navigate(['/customerHome']);
          }
          else 
          {
            this.errorMessage = 'Unknown account role.';
          }
      },
      error: (err: HttpErrorResponse) => 
      {
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
        this.successMessage = '';
      }
    });
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
}