import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { HouseResponse } from 'src/app/containers/model/house/house-response';
import { Observable, throwError } from 'rxjs';
import { ImageService } from 'src/app/containers/services/images/image.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-house',
  templateUrl: './my-house.component.html',
  styleUrls: ['./my-house.component.css'],
})
export class MyHouseComponent implements OnInit {
  imagesRef: Observable<string | null>[];
  @Input() house: HouseResponse;
  houses: HouseResponse[];

  constructor(
    private router: Router,
    private houseService: HouseService,
    private imageService: ImageService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getImagesByHouseId();
  }

  goToHouse(houseId: number): void {
    this.router.navigateByUrl('/view-house/' + houseId);
  }

  private getImagesByHouseId(): void {
    // console.log(this.houses);
    this.imageService.getAllImagesForHouse(this.house.id).subscribe(
      (data) => {
        // console.log(data);
        this.imagesRef = data.map((image) =>
          this.storage.ref(image.ref).getDownloadURL()
        );
      },
      (error) => {
        throwError(error);
      }
    );
  }

  reLoad(){
    // this.location.reload()
    window.location.reload();
  }

  deleteHouseById(id: number) {
    if (confirm('Are you sure?')) {
      this.houseService.deleteHouseById(id).subscribe(
        (res) => {
          window.alert('Delete house succeed!');
          this.reLoad();
          // console.log(res);
        },
        (rej) => {
          window.alert('Delete error for this house!');
        }
      );
    }
  }
}
