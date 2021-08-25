import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { AppService } from '../services/app.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private authService: AuthService,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.getFeedPosts();
  }

  getFeedPosts(): void {
    this.authService.getLoggedInUserId()
      .subscribe((uid: any) => {
        this.appService.getFeedPosts(uid)
          .subscribe(posts => {
            this.posts = posts;
          });

      })
  }

  toggleLikePost(post: Post) {
    this.appService.toggleLikePost(post);
  }

  toggleSavePost(post: Post) {
    this.appService.toggleSavePost(post);
  }

}
