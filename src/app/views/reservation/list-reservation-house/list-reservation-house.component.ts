import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { HouseResponse } from 'src/app/containers/model/house/house-response';
import { Observable, throwError } from 'rxjs';
import { ImageService } from 'src/app/containers/services/images/image.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ReservationService } from 'src/app/containers/services/reservation/reservation.service';
import { Reservation } from 'src/app/containers/model/reservation/reservation';

@Component({
  selector: 'app-list-reservation-house',
  templateUrl: './list-reservation-house.component.html',
  styleUrls: ['./list-reservation-house.component.css'],
})
export class ListReservationHouseComponent implements OnInit {
  reservations: Reservation[];
  houseId = +this.activateRouter.snapshot.paramMap.get('houseId');


  constructor(
    private reservationService: ReservationService,
    private route: Router,
    private activateRouter: ActivatedRoute,
    private houseService: HouseService
  ) { }

  ngOnInit(): void {
    this.getReservationsByHouse();
  }

  getReservationsByHouse(){
    this.reservationService.getReservationByHouseId(this.houseId).subscribe((res)=>{
      console.log(res);
      this.reservations = res;
    },
    (rej) => {

    })
  }

  deleteReservationById(id:number){
    if(confirm('Are you sure?')) {
      this.reservationService.deleteReservationById(id).subscribe(res =>{
        this.getReservationsByHouse();
        // console.log(res);
      })
    }
  }

}
