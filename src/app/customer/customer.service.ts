import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnGamesToCustomerDTO } from '../models/ReturnGameToCustDTO';
import { GetRequirementsDTO } from '../models/getRequirementsDTO';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}
  getName(): Observable<string>
  {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiURL}/getCustName`, {
      responseType: 'text',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllGames()
  {
    const token = localStorage.getItem('token');
    return this.http.get<ReturnGamesToCustomerDTO[]>(`${this.apiURL}/getAllGames`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getGameById(gameId:number)
  {
    const token = localStorage.getItem('token');
    return this.http.get<ReturnGamesToCustomerDTO>(`${this.apiURL}/getSingleGame?gameId=`+gameId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  addToCart(gameId: number): Observable<string>
  {
    const token = localStorage.getItem('token');
    return this.http.post(
      this.apiURL + "/addGameToCart?gameId=" + gameId,
      null,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`
            }
          : {},
        responseType: 'text'
      }
    );
  }
  rateGame(gameId:number,ratingGiven:number){
    const token = localStorage.getItem('token');
    return this.http.post(
      this.apiURL + "/rateGame?gameRating=" +ratingGiven+"&gameId="+gameId,
      null,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`
            }
          : {},
        responseType: 'text'
      }
    );
  }
  getRatingGiven(gameId:number)
  {
    const token = localStorage.getItem('token');
    return this.http.get<number>(`${this.apiURL}/getMyRating?gameId=`+gameId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getGameReq(gameId: number): Observable<GetRequirementsDTO>
  {
    const token = localStorage.getItem('token');
    return this.http.get<GetRequirementsDTO>(
      `${this.apiURL}/getGameReq?gameId=${gameId}`,
      {
        headers: 
        {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
