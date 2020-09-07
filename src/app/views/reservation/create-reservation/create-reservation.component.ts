import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/containers/services/reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/containers/model/reservation/reservation';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { HouseResponse } from 'src/app/containers/model/house/house-response';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
  createReservationForm: FormGroup;
  reservation: Reservation;
  houseId = +this.activateRouter.snapshot.paramMap.get('houseId');
  house: HouseResponse;


  constructor(private fb: FormBuilder,
              private reservationService: ReservationService,
              private route: Router,
              private activateRouter: ActivatedRoute,
              private houseService: HouseService) {
      this.reservation = {
        startDate: '',
        endDate: '',
        houseId: 0
      };
    }

  ngOnInit(): void {
    this.getHouseById();

    this.createReservationForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      houseId: [this.houseId, [Validators.required]]
    });
  }
  checkDateTimeNow() {
    const getStartDate = this.reservation.startDate;
    const dateTimeNow = new Date();
    const date = new Date(getStartDate);

    return date <= dateTimeNow ? null : { notSame: true };

    // console.log(dateTimeNow);
  }

  reservationHouseByCurrentUser() {
    this.reservation = this.createReservationForm.value;
    // console.log(this.reservation);

    this.reservationService.createProduct(this.reservation).subscribe((res) => {
      window.alert('Reservation successed!');
      console.log(res);
      this.route.navigate(['']);
      // window.alert(res.message);
    },
    (rej) => {
      console.log(rej);
      window.alert('Reservation failed!');
      // window.alert(rej.message);
    });
  }

  getHouseById(): void{
    this.houseService.getHouseById(this.houseId).subscribe((res) => {
      // console.log(res);
      this.house = res;
    },
    (rej) => {
      console.log(rej);
    })
  }

  get startDate(){
    return this.createReservationForm.get('startDate');
  }

  get endDate(){
    return this.createReservationForm.get('endDate');
  }

}
