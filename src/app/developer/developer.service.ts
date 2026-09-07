import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
import { ReturnGamesToDevDTO } from '../models/ReturnGameToDev';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  private apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}
  getName(): Observable<string>
  {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiURL}/getDevName`, {
      responseType: 'text',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getGames(): Observable<ReturnGamesToDevDTO[]> 
  {
    const token = localStorage.getItem('token');
    return this.http.get<ReturnGamesToDevDTO[]>(
      `${this.apiURL}/getMyGames`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  deleteGame(id:number)  
  {
    const token = localStorage.getItem('token');
    return this.http.delete(
      `${this.apiURL}/deleteMyGame?gameId=`+id,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  toggleAvailabiity(gameId:number)
  {
    const token = localStorage.getItem('token');
    return this.http.put(
      `${this.apiURL}/toggleAvailability?gameId=`+gameId,null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
