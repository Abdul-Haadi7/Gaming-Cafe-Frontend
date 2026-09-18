import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReturnUploadReqToAdmin } from '../models/ReturnUploadReqToAdminDTO';
import { ReturnGamesToAdminDTO } from '../models/ReturnGameToAdmin';
import { Warning } from '../models/Warnings';
import { ReturnWarningEndReq } from '../models/ReturnWarningEndReq';
import { ReturnDevsToAdmin } from '../models/ReturnDevsToAdmin';
import { ReturnCustomerToAdmin } from '../models/ReturnCustomerToAdmin';

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
  getAllGames()
  {
    const token = localStorage.getItem('token');
    return this.http.get<ReturnGamesToAdminDTO[]>(`${this.apiURL}/getAdminAllGames`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  approveGame(gameId:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      `${this.apiURL}/approveGame?gameId=${gameId}`
      ,null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  rejectGame(gameId:number,reason:string){
    const token = localStorage.getItem('token');
    return this.http.put(
      `${this.apiURL}/rejectGame?gameId=${gameId}&&reason=${reason}`
      ,null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  getReqCount()
  {
    const token = localStorage.getItem('token');
    return this.http.get<number>(
      `${this.apiURL}/getActiveReqCount`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  sendWarning(gameId:number, reason:string){
  const token = localStorage.getItem('token');
    return this.http.post(
      `${this.apiURL}/sendWarning?gameId=${gameId}&reason=${reason}`,null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  getAllActiveWarnings()
  {
    const token = localStorage.getItem('token');
    return this.http.get<Warning[]>(
      this.apiURL+"/getAllActiveWarnings",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  getAllWarningsCount()
  {
    const token = localStorage.getItem('token');
    return this.http.get<number>(
      this.apiURL+"/getActiveWarningsCount",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  endWarning(warning:Warning)
  {
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/endWarning"
      ,warning,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  getWarningEndReqs():Observable<ReturnWarningEndReq[]>{
    const token = localStorage.getItem('token');
    return this.http.get<ReturnWarningEndReq[]>(
      this.apiURL+"/getAllWarningEndReq",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  getWarningEndReqsCount():Observable<number>{
    const token = localStorage.getItem('token');
    return this.http.get<number>(
      this.apiURL+"/countEndWarningReq",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  approveReq(warningId:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/approveEndWarningReq?warningId="+warningId,null,
     {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  rejectEndWarningReq(warningId:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/rejectEndWarningReq?warningId="+warningId,null,
     {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  fetchAllDevs(){
    const token = localStorage.getItem('token');
    return this.http.get<ReturnDevsToAdmin[]>(
      this.apiURL+"/getAllDevelopers",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  fetchAllCust(){
    const token = localStorage.getItem('token');
    return this.http.get<ReturnCustomerToAdmin[]>(
      this.apiURL+"/getAllCustomers",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  deleteGame(gameId:number)
  {
    const token = localStorage.getItem('token');
    return this.http.delete(
      this.apiURL+"/deleteGame?gameId="+gameId,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  blockCust(custId:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/blockCust?custId="+custId,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  blockDev(devId:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/blockDev?devId="+devId,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  blockAdmin(adminId:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/blockAdmin?adminId="+adminId,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }



  unblockCust(custId:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/unblockCust?custId="+custId,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  unblockDev(devId:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/unblockDev?devId="+devId,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
  unblockAdmin(adminId:number){
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/unblockAdmin?adminId="+adminId,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
