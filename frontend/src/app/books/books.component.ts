import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  paginatedBooks: Book[] = [];
  baseUrl = 'http://localhost:3000/uploads/'; // Adjust this base URL to match your backend URL
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 1;

  constructor(private bookService: BooksService, private cartService: CartService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      this.totalPages = Math.ceil(this.books.length / this.itemsPerPage);
      this.updatePaginatedBooks();
    });
  }

  isAdmin(){
    return this.authService.checkAdminStatus();
  }

  getCoverImageUrl(imageName: string): string {
    return `${this.baseUrl}${imageName}`;
  }

  addToCart(bookId: string, quantity: number): void {
    this.cartService.addItemToCart(bookId, quantity).subscribe(() => {
      console.log('Book added to cart:', bookId);
    });
  }

  editBook(bookId: string): void {
    this.router.navigate(['/admin/edit-book', bookId]);
  }

  deleteBook(bookId: string): void {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.books = this.books.filter(book => book._id !== bookId);
      this.totalPages = Math.ceil(this.books.length / this.itemsPerPage);
      this.updatePaginatedBooks();
      console.log('Book deleted:', bookId);
    });
  }

  updatePaginatedBooks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedBooks();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedBooks();
    }
  }
}