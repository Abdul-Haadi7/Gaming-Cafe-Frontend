import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EditGameDTO } from '../models/EditGameDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditGameService 
{
  private apiURL = environment.apiURL;

  constructor(private http:HttpClient) {}
  
  getGameById(gameId: number): Observable<EditGameDTO>
  {
    const token = localStorage.getItem('token');

    return this.http.get<EditGameDTO>(
      `${this.apiURL}/getGameById?gameId=${gameId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  saveEditedGame(game:EditGameDTO, gameId:number)
  {
    const token = localStorage.getItem('token');
    return this.http.put(
      `${this.apiURL}/editMyGame?gameId=${gameId}`,
      game,
      {
        headers: 
        {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
