import { Component, OnInit, Input } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {HouseResponse} from '../../../containers/model/house/house-response';

@Component({
  selector: 'app-post-tile',
  templateUrl: './house-tile.component.html',
  styleUrls: ['./house-tile.component.css']
})
export class HouseTileComponent implements OnInit {
  faComments = faComments;
  @Input() posts: HouseResponse[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToHouse(houseId: number): void {
    this.router.navigateByUrl('/view-post/' + houseId);
  }
}
