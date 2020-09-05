import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { HouseResponse } from 'src/app/containers/model/house/house-response';
import { Observable, throwError } from 'rxjs';
import { ImageService } from 'src/app/containers/services/images/image.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-my-house',
  templateUrl: './my-house.component.html',
  styleUrls: ['./my-house.component.css'],
})
export class MyHouseComponent implements OnInit {
  imagesRef: Observable<string | null>[];
  @Input() house: HouseResponse;
  @Input() username: string;
  houses: HouseResponse[];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private houseService: HouseService,
    private imageService: ImageService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getImagesByHouseId();
    this.getAllHouseByUsename();
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

  getAllHouseByUsename() {
    this.houseService.getAllHouseByUser(this.username).subscribe((data) => {
      this.houses = data;
      // console.log(data);
    });
  }

  deleteReservationById(id: number) {
    if (confirm('Are you sure?')) {
      this.houseService.deleteHouseById(id).subscribe((res) => {
        this.getAllHouseByUsename();
      // this.router.navigate(['/houses-owned-user/' + this.username]);
        // console.log(res);
      });
    }
  }
}
