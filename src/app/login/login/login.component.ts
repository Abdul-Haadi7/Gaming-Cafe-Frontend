import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  errorMessage = '';

  constructor
  (
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void 
  {
    this.authService.logout();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void 
  {
    this.errorMessage = '';
    if (this.loginForm.invalid) 
    {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password })
      .subscribe({
        next: () => 
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
          else if (role === 'Admin') {
            this.router.navigate(['/adminHome']);
          }
          else if (role === 'Super Admin') {
            this.router.navigate(['/superAdminHome']);
          }
          else 
          {
            this.errorMessage = 'Unknown account role.';
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
        }
      });
  }
  goToNewAcc(): void 
  {
    this.router.navigate(['/newAcc']); 
  }
}