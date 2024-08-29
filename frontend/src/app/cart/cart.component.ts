import { Component, OnInit } from '@angular/core';
import { CartItem, Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart?: Cart;
  cartItems: CartItem[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((data) => {
      this.cart = data;
      this.cartItems = data.items;
      this.calculateTotalAmount();
      console.log('Cart items:', this.cartItems); // Log to check if items are correctly fetched
    }, error => {
      console.error('Error fetching cart items:', error);
    });
  }

  removeItem(cartItemId: string): void {
    this.cartService.removeItem(cartItemId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item._id !== cartItemId);
      this.calculateTotalAmount();
    });
  }

  updateQuantity(cartItemId: string, quantity: number): void {
    this.cartService.updateItemQuantity(cartItemId, quantity).subscribe((data) => {
      const item = this.cartItems.find(item => item._id === cartItemId);
      if (item) {
        item.quantity = quantity;
        this.calculateTotalAmount();
      }
    });
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.quantity * item.book.price, 0);
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
