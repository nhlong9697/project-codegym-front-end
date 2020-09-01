import { Component, OnInit } from '@angular/core';
import { CommentPayload } from 'src/app/containers/model/home/description.payload';
import { ActivatedRoute } from '@angular/router';
import {HouseService} from '../../../containers/services/post/house.service';
import {HouseResponse} from '../../../containers/model/house/house-response';



@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  name: string;
  posts: HouseResponse[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activateRoute: ActivatedRoute,
    private houseService: HouseService) {
      this.name = this.activateRoute.snapshot.params.name;

    this.houseService.getAllHouseByUser(this.name).subscribe((data) => {
      this.posts = data;
      this.postLength = data.length;
    });

  }

  ngOnInit(): void {
  }

}
