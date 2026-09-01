// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// import { LoginRequest, LoginResponse } from '../models/login-request.model';
import { LoginRequest, LoginResponse } from '../models/login-request.model';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService 
{
  private baseUrl = environment.apiURL; 

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> 
  {
    return this.http.post<LoginResponse>(`${this.baseUrl}/Login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
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