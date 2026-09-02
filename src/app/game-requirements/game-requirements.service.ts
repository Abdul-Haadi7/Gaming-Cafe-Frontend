import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GameRequirement, UploadRequirementsResponse } from '../models/GameReq';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameRequirementsService 
{
  private apiUrl = environment.apiURL;
  constructor(private http: HttpClient) {}
  
  uploadGameReq(req: GameRequirement) : Observable<UploadRequirementsResponse>
  {
    const token = localStorage.getItem('token');

    return this.http.post<UploadRequirementsResponse>(
      `${this.apiUrl}/uploadGameRequirements`,
      req,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
