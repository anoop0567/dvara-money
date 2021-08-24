import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getFeedPosts();
  }

  getFeedPosts(): void {
    this.appService.getFeedPosts()
      .subscribe(posts => {
        console.log(posts);
        this.posts = posts;
      });
  }

  toggleLikePost(post_id: string) {
    console.log('Like post');
  }

  toggleSavePost(post_id: string) {
    console.log('Save post');
  }

}
