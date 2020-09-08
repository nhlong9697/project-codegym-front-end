import { Component, OnInit } from '@angular/core';
import { HouseResponse } from 'src/app/containers/model/house/house-response';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { Observable, throwError } from 'rxjs';
import { ImageService } from '../../../containers/services/images/image.service';
import { ImagePayload } from '../../../containers/model/image/image';
import { AngularFireStorage } from '@angular/fire/storage';
import { CommentPayload } from 'src/app/containers/model/comment/comment.payload';
import { CommentService } from 'src/app/containers/services/comment/comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit {
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  houseId: number;
  votes: number;
  username: string;
  house: HouseResponse;
  imagesRef: Observable<string | null>[];
  arrayVote(n: number): any[] {
    return Array(n);
  }

  constructor(
    private router: Router,
    private houseService: HouseService,
    private activateRoute: ActivatedRoute,
    private route: Router,
    private imageService: ImageService,
    private storage: AngularFireStorage,
    private commentService: CommentService
  ) {
    this.houseId = this.activateRoute.snapshot.params.houseId;
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required),
      votes: new FormControl(''),
    });
    this.commentPayload = {
      text: '',
      houseId: this.houseId,
      username: this.username,
      votes: this.votes,
    };
    this.house = new HouseResponse();
  }

  ngOnInit(): void {
    this.getHouseById();
    this.getImagesByHouseId();
    this.getCommentsForHouse();
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
        this.imagesRef = data.map((image) =>
          this.storage.ref(image.ref).getDownloadURL()
        );
      },
      (error) => {
        throwError(error);
      }
    );
  }

  goToListByUser(userName: string): void {
    this.router.navigateByUrl('/list-house/' + userName);
  }

  private getCommentsForHouse(): void {
    this.commentService.getAllCommentsForHouse(this.houseId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  goToProfile(userName: string): void {
    this.router.navigateByUrl('/houses-owned-user/' + userName);
  }
  postComment(): void {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentPayload.votes = this.votes;

    // console.log('da nhan'+ this.votes);
    console.log(this.commentPayload);
    this.commentService.postComment(this.commentPayload).subscribe(
      (data) => {
        // console.log('da gui text'+this.commentForm.get('text').value);
        console.log('da gui votes' + this.votes);

        this.commentForm.get('text').setValue('');

        this.getCommentsForHouse();
      },
      (error) => {
        throwError(error);
      }
    );
  }


  onRateChange(value): void {
    this.votes = value;
  }
}
