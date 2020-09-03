import { Component, OnInit, Input } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {HouseResponse} from '../../../containers/model/house/house-response';
import {HouseService} from '../../../containers/services/house/house.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ImageService} from '../../../containers/services/images/image.service';

@Component({
  selector: 'app-house-tile',
  templateUrl: './house-tile.component.html',
  styleUrls: ['./house-tile.component.css']
})
export class HouseTileComponent implements OnInit {
  faComments = faComments;
  @Input() house: HouseResponse;
  imageResponses: any[];
  retrieveImage: any;
  base64Data: any;
  constructor(
    private router: Router,
    private houseService: HouseService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.getImageForHouse();

  }
  goToHouse(houseId: number): void {
    this.router.navigateByUrl('/view-house/' + houseId);
  }

  private getImageForHouse() {
  }
}
