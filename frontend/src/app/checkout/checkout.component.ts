import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  get f() { return this.checkoutForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }

    this.cartService.checkout(this.checkoutForm.value).subscribe(
      (response) => {
        alert('Order placed successfully!');
        this.router.navigate(['/']); // Redirect to home or order confirmation page
      },
      (error) => {
        console.error('Error during checkout:', error);
      }
    );
  }
}
