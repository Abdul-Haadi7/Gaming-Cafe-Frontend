import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnGamesToCustomerDTO } from '../models/ReturnGameToCustDTO';

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
}
