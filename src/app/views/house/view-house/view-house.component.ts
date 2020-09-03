import { Component, OnInit } from '@angular/core';
import { HouseResponse } from 'src/app/containers/model/house/house-response';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.css']
})
export class ViewHouseComponent implements OnInit {
  houseId: number;
  house: HouseResponse
  constructor(private router: Router,
    private houseService: HouseService,
    private activateRoute: ActivatedRoute,
    private route: Router) {
      this.houseId = this.activateRoute.snapshot.params.houseId;
     }

  ngOnInit(): void {
    this.getHouseById();
  }

  private getHouseById() {
    this.houseService.getHouse(this.houseId).subscribe(
      (data) => {
        console.log(data);
        this.house = data;
      },
      (error) => {
        throwError(error);
        console.log("error")
      }
    );
  }

  goToProfile(userName: string): void {
    this.router.navigateByUrl('/user-profile/' + userName);
  }
}
