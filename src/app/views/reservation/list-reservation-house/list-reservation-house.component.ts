import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { ReservationService } from 'src/app/containers/services/reservation/reservation.service';
import { Reservation } from 'src/app/containers/model/reservation/reservation';
import { Location } from '@angular/common';

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
    private router: Router,
    private activateRouter: ActivatedRoute,
    private houseService: HouseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getReservationsByHouse();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getReservationsByHouse(){
    this.reservationService.getReservationByHouseId(this.houseId).subscribe((res)=>{
      // console.log(res);
      this.reservations = res;
    },
    (rej) => {

    })
  }

  deleteReservationByIdIsHouseOwner(id:number){
    if(confirm('Are you sure?')) {
      this.reservationService.deleteReservationById(id).subscribe(res =>{
        window.alert('Delete reservation succeed!');
        this.getReservationsByHouse();
        // console.log(res);
      },
      (rej) => {
        window.alert('Delete error for this reservation!');
      })
    }
  }

}
