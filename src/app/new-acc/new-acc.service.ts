import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NewAccDTO, newAccResponse } from '../models/NewAccDto';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class NewAccService {
  private baseUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  createAccount(dto: NewAccDTO): Observable<newAccResponse> {
    return this.http.post<newAccResponse>(`${this.baseUrl}/createNewAcc`, dto).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }
}
export { NewAccDTO };