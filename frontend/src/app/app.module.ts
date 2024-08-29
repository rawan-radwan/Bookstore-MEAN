import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ProfileComponent } from './profile/profile.component';
import { BookManagerComponent } from './admin/book-manager/book-manager.component';
import { UserManagerComponent } from './admin/user-manager/user-manager.component';
import { CommentManagerComponent } from './admin/comment-manager/comment-manager.component';
import { CartComponent } from './cart/cart.component';
import { AuthInterceptor } from './auth-interceptor';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    BooksComponent,
    BookDetailsComponent,
    ProfileComponent,
    BookManagerComponent,
    UserManagerComponent,
    CommentManagerComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
