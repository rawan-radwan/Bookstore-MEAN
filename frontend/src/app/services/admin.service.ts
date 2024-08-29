import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) { }

  getComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments`);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/${commentId}`);
  }

  editComment(commentId: string, newContent: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/comments/${commentId}`, { content: newContent });
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  blockUser(userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}/block`, {});
  }

  unblockUser(userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}/unblock`, {});
  }

  changeUserAvatar(userId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.put(`${this.baseUrl}/users/${userId}/avatar`, formData);
  }
}
