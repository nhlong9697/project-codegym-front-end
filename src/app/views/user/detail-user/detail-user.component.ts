import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/containers/model/home/post-model';
import { CommentPayload } from 'src/app/containers/model/home/description.payload';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/containers/services/auth/auth.service';



@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activateRoute: ActivatedRoute,
    private authService: AuthService) {
      this.name = this.activateRoute.snapshot.params.name;

    this.authService.getAllHouseByUser(this.name).subscribe((data) => {
      this.posts = data;
      this.postLength = data.length;
    });

    this.authService.getAllCommentsByUser(this.name).subscribe((data) => {
      this.comments = data;
      this.commentLength = data.length;
    });
     }

  ngOnInit(): void {
  }

}
