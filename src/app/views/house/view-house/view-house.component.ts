import { Component, OnInit } from '@angular/core';
import { HouseResponse } from 'src/app/containers/model/house/house-response';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import {Observable, throwError, from} from 'rxjs';
import {ImageService} from '../../../containers/services/images/image.service';
import {ImagePayload} from '../../../containers/model/image/image';
import {AngularFireStorage} from '@angular/fire/storage';
import { CommentService } from 'src/app/containers/services/comment/comment.service'
import { FormGroup } from '@angular/forms';
import { CommentPayload } from 'src/app/containers/model/comment/comment.payload';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit {
  houseId: number;
  house: HouseResponse;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  imagesRef: Observable<string | null>[];
  constructor(private router: Router,
              private houseService: HouseService,
              private activateRoute: ActivatedRoute,
              private route: Router,
              private imageService: ImageService,
              private commentService: CommentService,
              private storage: AngularFireStorage
  ) {
      this.houseId = this.activateRoute.snapshot.params.houseId;
     }

  ngOnInit(): void {
    this.getHouseById();
    this.getImagesByHouseId();
  }

  private getHouseById(): void {
    this.houseService.getHouse(this.houseId).subscribe(
      (data) => {
        console.log(data);
        this.house = data;
      },
      (error) => {
        throwError(error);
        console.log('error');
      }
    );
  }

  private getImagesByHouseId(): void {
    this.imageService.getAllImagesForHouse(this.houseId).subscribe(
      (data) => {
        this.imagesRef = data.map(image => this.storage.ref(image.ref).getDownloadURL());
      },
      (error) => {
        throwError(error);
      }
    );
  }

  goToProfile(userName: string): void {
    this.router.navigateByUrl('/user-profile/' + userName);
  }

  private getCommentsForHouse() {
    this.commentService.getAllCommentsForHouse(this.houseId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }
}
