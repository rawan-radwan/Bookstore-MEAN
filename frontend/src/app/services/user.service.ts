import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiURL}/profile`);
  }

  getUserPurchases(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/purchase-history`);
  }

  getUserFavorites(): Observable<any> {
    return this.http.get(`${this.apiURL}/favorites`);
  }

  changeAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.put(`${this.apiURL}/avatar`, formData);
  }
}
