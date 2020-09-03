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
    this.getImageForHouse(this.house.houseId);
  }
  goToHouse(houseId: number): void {
    this.router.navigateByUrl('/view-house/' + houseId);
  }

  private getImageForHouse(houseId: number) {
    this.imageService.getAllImagesForHouse(houseId).subscribe(
      res => {
        console.log(res);
        this.imageResponses = res;
        this.base64Data = this.imageResponses[0].picByte;
        console.log(this.base64Data);
        this.retrieveImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
  }
}
