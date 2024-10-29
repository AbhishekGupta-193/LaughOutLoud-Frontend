import { Component, OnInit, signal } from '@angular/core';
import { HttpService } from './sharedData/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: number | null = null;
  userDetails: any;
  searchText: any;
  posts: any;
  readonly panelOpenState = signal(false);
  constructor(private route: ActivatedRoute, private http: HttpService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      console.log("user id in profile : ", this.userId);

      // Move the HTTP request here to ensure it runs every time the userId changes
      this.http.getUserById("/users", this.userId).subscribe({
        next: (res: any) => {
          console.log("GetUserById Service successful : ", res);
          this.userDetails = res;
          this.posts = this.userDetails.posts;
        },
        error: (err: any) => {
          console.error('GetUserById Service Failed :', err);
        }
      });
    });
  }

  onDeleteBtnClick(postId: any) {
    if (confirm("Are you sure you want to delete this post?")) {
      this.http.deletePost("/posts", postId).subscribe({
        next: (res: any) => {
          alert("Post deleted successfully");
          console.log("DeletePost Service successful", res);
          window.location.reload(); // Refresh the page
        },
        error: (err: any) => {
          console.log("DeletePost Service Failed", err);
        }
      });
    } else {
      console.log("Delete action cancelled");
    }
  }
}
