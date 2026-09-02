import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  private apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}

  getName(): Observable<string>
  {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiURL}/getName`, 
    {
      responseType: 'text',
      headers: 
      {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
