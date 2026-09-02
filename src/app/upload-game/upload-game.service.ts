import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Game, UploadGameResponse } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class UploadGameService {

  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  uploadGame(game: Game): Observable<UploadGameResponse> 
  {
    const token = localStorage.getItem('token');

    return this.http.post<UploadGameResponse>(
      `${this.apiUrl}/uploadGame`,
      game,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
