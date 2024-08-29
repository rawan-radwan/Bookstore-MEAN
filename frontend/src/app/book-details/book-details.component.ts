import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  book: Book | undefined;
  newComment: string = '';
  newRating: number | null = null;
  comments: any[] = [];
  quantity: number = 1; // Default quantity

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.booksService.getBookById(bookId).subscribe((data: Book) => {
        this.book = data;
        this.comments = data.comments || [];
      });
    }
  }

  getCoverImageUrl(coverImage: string): string {
    return `http://localhost:3000/uploads/${coverImage}`;
  }

  submitComment(): void {
    if (this.book && this.newComment.trim()) {
      this.booksService.commentOnBook(this.book._id, this.newComment).subscribe(() => {
        this.comments.push({ text: this.newComment, date: new Date() });
        this.newComment = '';
      });
    }
  }

  submitRating(): void {
    if (this.book && this.newRating !== null) {
      this.booksService.rateBook(this.book._id, this.newRating).subscribe(() => {
        if (this.book) {
          this.book.ratings?.push(this.newRating!); // Add the new rating to the array
          this.newRating = null;
        }
      });
    }
  }

  addToCart(): void {
    if (this.book) {
      this.cartService.addItemToCart(this.book._id, this.quantity).subscribe(() => {
        console.log('Book added to cart:', this.book);
      });
    }
  }

  getAverageRating(): number {
    if (this.book?.ratings && this.book.ratings.length > 0) {
      const validRatings = this.book.ratings.filter(rating => typeof rating === 'number' && !isNaN(rating));
      const sum = validRatings.reduce((a, b) => a + b, 0);
      return validRatings.length > 0 ? sum / validRatings.length : 0;
    }
    return 0;
  }
}
