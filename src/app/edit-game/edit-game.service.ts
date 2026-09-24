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
  saveEditedGame(game:EditGameDTO, image: File | null)
  {
    const formData = new FormData();
    
    formData.append(
      'id',
      game.id.toString()
    );

    formData.append(
      'name',
      game.name
    );

    formData.append(
      'price',
      game.price.toString()
    );

    formData.append(
      'intro',
      game.intro
    );

    formData.append(
      'description',
      game.description
    );

    formData.append(
      'genre',
      game.genre
    );

    formData.append(
      'downloadLink',
      game.downloadLink
    );
   formData.append(
      'imageLink',
      game.imageLink
    );
    formData.append(
      'discountPercentage',
      game.discountPercentage.toString()
    );
    if(image)
    {
      formData.append(
        'image',
        image
      );
    }
    const token = localStorage.getItem('token');
    return this.http.put(
      this.apiURL+"/editMyGame",
      formData,
      {
        headers: 
        {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
