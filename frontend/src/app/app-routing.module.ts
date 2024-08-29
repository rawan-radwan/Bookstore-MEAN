import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ProfileComponent } from './profile/profile.component';
import { BookManagerComponent } from './admin/book-manager/book-manager.component';
import { CommentManagerComponent } from './admin/comment-manager/comment-manager.component';
import { UserManagerComponent } from './admin/user-manager/user-manager.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './auth-guard';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'books', component: BooksComponent},
  {path: 'books/:id', component: BookDetailsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {path: 'admin/add-book', component: BookManagerComponent},
  {path: 'admin/edit-book/:id', component: BookManagerComponent },
  {path: 'admin/manage-comments', component: CommentManagerComponent},
  {path: 'admin/manage-user', component: UserManagerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
