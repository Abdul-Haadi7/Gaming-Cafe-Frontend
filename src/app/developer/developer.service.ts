import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
import { ReturnGamesToDevDTO } from '../models/ReturnGameToDev';
import { Warning } from '../models/Warnings';
import { SendWarningEndReqDTO } from '../models/SendWarningEndReqDTO';
import { ReturnUploadReqToDev } from '../models/ReturnUploadReqToDev';
import { ReturnWarningEndReq } from '../models/ReturnWarningEndReq';

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
  getUploadRequests(): Observable<ReturnUploadReqToDev[]> 
  {
    const token = localStorage.getItem('token');
    return this.http.get<ReturnUploadReqToDev[]>(
      `${this.apiURL}/viewPendingGameRequests`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  getReceivedWarnings(): Observable<Warning[]> 
  {
    const token = localStorage.getItem('token');
    return this.http.get<Warning[]>(
      `${this.apiURL}/viewReceivedWarnings`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  sendRequest(req: SendWarningEndReqDTO){
    const token = localStorage.getItem('token');
    return this.http.post(
      this.apiURL+"/makeEndWarningRequest",req,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  getWarningsCount():Observable<number>{
    const token = localStorage.getItem('token');
    return this.http.get<number>(
      this.apiURL+"/getWarningsCount",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  markUploadReqAsDontShow(id:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/doNotShowUploadReq?gameId="+id,null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  markWarningEndReqAsDontShow(id:number){
   const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/doNotShowWarningEndReq?reqId="+id,null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  getEndWarningReqs():Observable<ReturnWarningEndReq[]>
  {
    const token = localStorage.getItem('token');
    return this.http.get<ReturnWarningEndReq[]>(
      this.apiURL+"/getEndWarningReqs",
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
