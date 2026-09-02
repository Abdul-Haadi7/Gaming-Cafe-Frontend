// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import { LoginRequest, LoginResponse } from '../models/login-request.model';
import { LoginRequest, LoginResponse } from '../models/login-request.model';
import { environment } from '../../../environments/environment.development';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService 
{
  private baseUrl = environment.apiURL; 

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> 
  {
    return this.http.post<LoginResponse>(`${this.baseUrl}/Login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }
  
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

   isLoggedIn(): boolean {

    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  getToken(): string | null
  {
    if (isPlatformBrowser(this.platformId))
    {
      return localStorage.getItem('token');
    }
    return null;
  }
  getRole(): string | null 
  {
    const token = this.getToken();

    if (!token) 
    {
      return null;
    }

    try 
    {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.role ?? null;
    } 
    catch (error)
    {
      console.error('Invalid token:', error);
      return null;

    }
  }
}