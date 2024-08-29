import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any;
  purchaseHistory: any[] = [];
  // favoriteBooks: any[] = [];
  avatarUrl = 'http://localhost:3000/uploads/';

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      data => this.user = data,
      error => console.error('Error fetching user profile:', error)
    );
    this.userService.getUserPurchases().subscribe(
      (data: any[]) => {
        this.purchaseHistory = data;
      },
      (error) => {
        console.error('Error fetching purchase history:', error);
      }
    );
    // this.userService.getUserFavorites().subscribe(
    //   data => this.favoriteBooks = data,
    //   error => console.error('Error fetching favorite books:', error)
    // );
  }

  getAvatarUrl(imageName: string): string {
    return `${this.avatarUrl}${imageName}`;
  }

  getImageUrl(coverImage: string): string {
    return `${this.avatarUrl}${coverImage}`;
  }


  changeAvatar(event: any) {
    const file = event.target.files[0];
    this.userService.changeAvatar(file).subscribe(
      () => {
        console.log('Avatar changed successfully');
        this.userService.getUserProfile().subscribe(
          data => this.user = data,
          error => console.error('Error fetching updated user profile:', error)
        );
      },
      error => console.error('Error changing avatar:', error)
    );
  }
}
