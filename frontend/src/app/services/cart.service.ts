import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addItemToCart(bookId: string, quantity: number): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, { bookId, quantity });
  }

  updateItemQuantity(itemId: string, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${itemId}`, { quantity });
  }

  removeItem(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }

  checkout(checkoutData: { paymentMethod: string; address: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkout`, checkoutData);
  }
}
