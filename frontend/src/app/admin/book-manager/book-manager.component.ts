import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrl: './book-manager.component.css'
})
export class BookManagerComponent implements OnInit {
  bookForm!: FormGroup;
  isEdit = false;
  bookId: string | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private bookService: BooksService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      stock:['', [Validators.required, Validators.min(1)]],
      coverImage: [null]
    });
  }

  ngOnInit(): void {
    if (!this.authService.checkAdminStatus()) {
      this.router.navigate(['/']);
      return;
    }

    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.isEdit = true;
      this.bookService.getBookById(this.bookId).subscribe(
        (data) => this.bookForm.patchValue(data),
        (error) => console.error('Error fetching book details:', error)
      );
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = new FormData();
      formData.append('title', this.bookForm.get('title')?.value);
      formData.append('author', this.bookForm.get('author')?.value);
      formData.append('description', this.bookForm.get('description')?.value);
      formData.append('price', this.bookForm.get('price')?.value);
      formData.append('stock', this.bookForm.get('stock')?.value);
      if (this.selectedFile) {
        formData.append('coverImage', this.selectedFile);
      }

      if (this.isEdit && this.bookId) {
        this.bookService.editBook(this.bookId, formData).subscribe(
          () => this.router.navigate(['/books']),
          (error) => console.error('Error updating book:', error)
        );
      } else {
        this.bookService.addBook(formData).subscribe(
          () => this.router.navigate(['/books']),
          (error) => console.error('Error adding book:', error)
        );
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}