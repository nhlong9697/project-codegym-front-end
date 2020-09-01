import { Component, OnInit, Input } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from 'src/app/containers/model/home/post-model';
import { Router } from '@angular/router';
import {HouseResponse} from '../../../containers/model/house/house-response';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  faComments = faComments;
  @Input() houses: HouseResponse[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToPost(postId: number): void {
    this.router.navigateByUrl('/view-post/' + postId);
  }
}
