import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import {PostService} from '../../containers/services/post/post.service';
import {PostResponse} from '../../containers/model/house/post-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: Array<PostResponse> = [];
  constructor(private housesService: PostService) {
    this.housesService.getAllPosts().subscribe((houses) => {
      this.houses = houses;
    });
   }

  ngOnInit(): void {
  }

}
