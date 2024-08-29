import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private platformId: Object;
  // isadmin: boolean;
  

  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID) platformId: Object){
    this.platformId = platformId;
  }



  isAuthenticated(){
    return isPlatformBrowser(this.platformId) && this.authService.isLoggedIn();
  }
  isAdmin(){
    return isPlatformBrowser(this.platformId) && this.authService.checkAdminStatus();
  }

  logout(){
    if (isPlatformBrowser(this.platformId)) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

}
