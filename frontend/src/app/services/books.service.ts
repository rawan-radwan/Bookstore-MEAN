import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = 'http://localhost:3000/api/books';
  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBookById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  rateBook(bookId: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bookId}/rate`, { rating });
  }

  commentOnBook(bookId: string, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${bookId}/comment`, { comment });
  }

  // Admin
  addBook(book: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/admin/books`, book);
  }

  editBook(bookId: string, book: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/admin/books/${bookId}`, book);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/admin/books/${bookId}`);
  }
}
