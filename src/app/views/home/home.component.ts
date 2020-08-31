import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/containers/model/home/post-model';
import { AuthService } from 'src/app/containers/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Array<PostModel> = [];
  constructor(private authService: AuthService) {
    this.authService.getAllPosts().subscribe((post) => {
      this.posts = post;
    });
   }

  ngOnInit(): void {
  }

}
