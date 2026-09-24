import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Game,UploadGameResponse } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class UploadGameService {

  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

uploadGame(game: Game, image: File): Observable<any> {

    const formData = new FormData();
    
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
      'discountPercentage',
      game.discountPercentage.toString()
    );

    formData.append(
      'image',
      image
    );
    const token = localStorage.getItem('token');

    return this.http.post<any>(
      this.apiUrl+"/uploadGame",formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }
}
