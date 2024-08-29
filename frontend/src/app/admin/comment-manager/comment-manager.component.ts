import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-manager',
  templateUrl: './comment-manager.component.html',
  styleUrl: './comment-manager.component.css'
})
export class CommentManagerComponent implements OnInit {
  comments: any[] = [];

  constructor(private adminService: AdminService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.checkAdminStatus()) {
      this.router.navigate(['/']);
      return;
    }

    this.adminService.getComments().subscribe(
      (data) => this.comments = data,
      (error) => console.error('Error fetching comments:', error)
    );
  }

  deleteComment(commentId: string) {
    this.adminService.deleteComment(commentId).subscribe(
      () => this.comments = this.comments.filter(comment => comment._id !== commentId),
      (error) => console.error('Error deleting comment:', error)
    );
  }

  editComment(commentId: string, newContent: string) {
    this.adminService.editComment(commentId, newContent).subscribe(
      updatedComment => {
        const index = this.comments.findIndex(comment => comment._id === commentId);
        if (index !== -1) {
          this.comments[index] = updatedComment;
        }
      },
      (error) => console.error('Error editing comment:', error)
    );
  }
}