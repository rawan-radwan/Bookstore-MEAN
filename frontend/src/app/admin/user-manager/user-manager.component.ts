import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.checkAdminStatus()) {
      this.router.navigate(['/']);
      return;
    }

    this.adminService.getUsers().subscribe(
      (data) => this.users = data,
      (error) => console.error('Error fetching users:', error)
    );
  }

  blockUser(userId: string) {
    this.adminService.blockUser(userId).subscribe(
      () => {
        const user = this.users.find(user => user._id === userId);
        if (user) user.isBlocked = true;
      },
      (error) => console.error('Error blocking user:', error)
    );
  }

  unblockUser(userId: string) {
    this.adminService.unblockUser(userId).subscribe(
      () => {
        const user = this.users.find(user => user._id === userId);
        if (user) user.isBlocked = false;
      },
      (error) => console.error('Error unblocking user:', error)
    );
  }

  changeUserAvatar(userId: string, event: any) {
    const file = event.target.files[0];
    this.adminService.changeUserAvatar(userId, file).subscribe(
      () => console.log('Avatar changed successfully'),
      (error) => console.error('Error changing avatar:', error)
    );
  }
}