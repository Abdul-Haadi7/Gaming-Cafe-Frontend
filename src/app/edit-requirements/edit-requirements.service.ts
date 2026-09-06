import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameRequirement } from '../models/GameReq';
import { GetRequirementsDTO } from '../models/getRequirementsDTO';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EditRequirementsService 
{
  private apiURL = environment.apiURL;
  constructor(private http:HttpClient) { }

  getReqById(gameId: number): Observable<GetRequirementsDTO>
  {
    const token = localStorage.getItem('token');
    return this.http.get<GetRequirementsDTO>(
      `${this.apiURL}/getGameReqById?gameId=${gameId}`,
      {
        headers: 
        {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  saveEditedReq(req: GetRequirementsDTO, gameId:number)
  {
    const token = localStorage.getItem('token');
    return this.http.put(
      `${this.apiURL}/editMyGameReuirements?gameId=${gameId}`,
      req,
      {
        headers: 
        {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}