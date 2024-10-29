import { Component, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from 'src/app/Dialog/logout-dialog/logout-dialog.component';
import { SignInService } from 'src/app/Authentication/signin/sharedData/sign-in.service';
import { HttpService } from './sharedData/http.service';
import { Router } from '@angular/router';
interface Comment {
  id: number;
  text: string;
}

interface Post {
  id: number;
  content: string;
  mediaUrl: string;
  comments: Comment[];
  username: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public dialog: MatDialog,
    private signInService:SignInService,
    private httpService:HttpService,
    private router:Router
  ) {}
  
  readonly panelOpenState = signal(false);

  searchText:any;
  currentRoute: string = '';
  userDetails:any;
  allUserDetails:any;
  ngOnInit(): void {
    // Retrieve userDetails from localStorage on component initialization
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      try {
        this.userDetails = JSON.parse(storedUserDetails);
      } catch (e) {
        console.error('Error parsing userDetails from localStorage', e);
        this.userDetails = {}; // Handle parsing error
      }
    } else {
      this.userDetails = {}; // Initialize to an empty object if not found
    }
  
    // Subscribe to userDetails updates
    this.signInService.userDetails.subscribe({
      next: (user: any) => {
        if (user) {
          // Convert the user object to a JSON string before storing it in localStorage
          localStorage.setItem('userDetails', JSON.stringify(user));
          
          // Update the userDetails property
          this.userDetails = user;
          
          console.log("User data in dashboard: ", this.userDetails);
        } else {
          console.warn('Received null or undefined user details');
        }
      },
      error: (err: any) => {
        console.error('Error fetching user details:', err);
      }
    });
  
    // Retrieve allUserDetails from localStorage on component initialization
    const storedAllUserDetails = localStorage.getItem('allUserDetails');
    if (storedAllUserDetails) {
      try {
        this.allUserDetails = JSON.parse(storedAllUserDetails);
      } catch (e) {
        console.error('Error parsing allUserDetails from localStorage', e);
        this.allUserDetails = []; // Handle parsing error
      }
    } else {
      this.allUserDetails = []; // Initialize to an empty array if not found
    }
  
    // Fetch all user details from the service
    this.httpService.getUsersData("/users").subscribe({
      next: (res: any) => {
        localStorage.setItem('allUserDetails', JSON.stringify(res));
        this.allUserDetails = this.shuffleArray(res);
        this.processData();
        console.log("getUsersData Service successful ", res);
      },
      error: (err: string) => {
        console.log("getUsersData Service failed", err);
      }
    });
  
    console.log("posts", this.posts);

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      console.log("curren route: ",this.currentRoute);
    });
  }
  


  posts: Post[] = [];
  processData() {
    this.allUserDetails.forEach((user: any) => {
      user.posts.forEach((post: any) => {
        this.posts.push({
          id: post.id,
          content: post.content,
          mediaUrl: post.mediaUrl,
          comments: post.comments,
          username: user.username
        });
      });
    });
  }


  content:string='';
  mediaUrl:string='';
  onPostBtnClick(){
    const content = this.content;
    const mediaUrl =this.mediaUrl;
    const user={
      id:this.userDetails.id
    }
    this.httpService.createPost("/posts",{content,mediaUrl,user}).subscribe({
      next:(res:any)=>{
        console.log("createPost Service successful ",res);
      },
      error:(err:any)=>{
        console.log("createPost Service Failed ",err);
      }
    })
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  onChatBtnClick(){
    this.router.navigate(['/chat']);
  }

  onHomeClick(){
    this.router.navigate(['']);
  }

  onProfileClick(userId:any){
    this.router.navigate(['/profile',userId]);
  }

  onDeleteBtnClick(postId: any) {
    if (confirm("Are you sure you want to delete this post?")) {
      this.httpService.deletePost("/posts", postId).subscribe({
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
  
  // onPhotoUpload(event: any){
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.mediaUrl=e.target.result;
  //       // console.log('Image URL:', this.imageUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }


  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '200px',
      height: '150px',
      position: { top: '-670px', left: '840px' },
      panelClass: 'custom-dialog-container'
    });
  }
}
