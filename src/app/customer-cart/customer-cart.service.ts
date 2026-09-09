import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartGames } from '../models/CartGames';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerCartService {
  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiURL;  

  getCartGames():Observable<CartGames[]>{
    const token = localStorage.getItem('token');
    return this.http.get<CartGames[]>(
      this.apiUrl+"/getCartItems",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  deleteGameFromCart(gameId:number){
    const token = localStorage.getItem('token');
      return this.http.delete(
        `${this.apiUrl}/deleteFromCart?gameId=`+gameId,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  }
  clearCart(){
    const token = localStorage.getItem('token');
      return this.http.delete(
        `${this.apiUrl}/clearCart`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  }
  checkOut()
  {
    const token = localStorage.getItem('token');
    return this.http.post(
    `${this.apiUrl}/checkOut`,null,
    {
      headers: 
      {
        Authorization: `Bearer ${token}`
      }
    }
    );  
  }
}
