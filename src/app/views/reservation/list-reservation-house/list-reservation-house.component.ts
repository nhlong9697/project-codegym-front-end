import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { HouseResponse } from 'src/app/containers/model/house/house-response';

@Component({
  selector: 'app-list-reservation-house',
  templateUrl: './list-reservation-house.component.html',
  styleUrls: ['./list-reservation-house.component.css']
})
export class ListReservationHouseComponent implements OnInit {
  name: string;
  houses: HouseResponse[];
  postLength: number;


  constructor(
    private activateRoute: ActivatedRoute,
    private houseService: HouseService
  ) {
    this.name = this.activateRoute.snapshot.params.username;
    this.houseService.getAllHouseByUser(this.name).subscribe((data) => {
      this.houses = data;
      this.postLength = data.length;
      console.log(data);
  });
  }

  ngOnInit(): void {
  }

}
