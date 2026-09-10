import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReturnUploadReqToAdmin } from '../models/ReturnUploadReqToAdminDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}
  getName(): Observable<string>
  {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiURL}/getAdminName`, {
      responseType: 'text',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getUploadRequests(): Observable<ReturnUploadReqToAdmin[]> 
  {
    const token = localStorage.getItem('token');
    return this.http.get<ReturnUploadReqToAdmin[]>(
      `${this.apiURL}/getPendingUploadRequests`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  approveGame(gameId:number, approve:boolean){
    const token = localStorage.getItem('token');
    return this.http.put(
      `${this.apiURL}/approveGame?gameId=${gameId}&&approve=${approve}`,null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
