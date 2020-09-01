import { Component, OnInit } from '@angular/core';
import { CommentPayload } from 'src/app/containers/model/home/description.payload';
import { ActivatedRoute } from '@angular/router';
import {PostService} from '../../../containers/services/post/post.service';
import {PostResponse} from '../../../containers/model/house/post-response';



@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  name: string;
  posts: PostResponse[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activateRoute: ActivatedRoute,
    private houseService: PostService) {
      this.name = this.activateRoute.snapshot.params.name;

    this.houseService.getAllPostsByUser(this.name).subscribe((data) => {
      this.posts = data;
      this.postLength = data.length;
    });

  }

  ngOnInit(): void {
  }

}
