import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/containers/services/reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/containers/model/reservation/reservation';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { HouseResponse } from 'src/app/containers/model/house/house-response';
import * as moment from 'moment';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
})
export class CreateReservationComponent implements OnInit {
  createReservationForm: FormGroup;
  reservation: Reservation;
  houseId = +this.activateRouter.snapshot.paramMap.get('houseId');
  house: HouseResponse;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private route: Router,
    private activateRouter: ActivatedRoute,
    private houseService: HouseService
  ) {
    this.reservation = {
      startDate: '',
      endDate: '',
      houseId: 0,
    };
  }

  ngOnInit(): void {
    this.getHouseById();

    this.createReservationForm = this.fb.group(
      {
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        houseId: [this.houseId, [Validators.required]],
      },
      { validators: this.checkDateTimeNow }
    );
  }

  checkDateTimeNow(group: FormGroup) {
    // let sDate = new Date(group.controls.startDate.value);
    const dateTimeNow = Date.now();
    // const startDate = moment(group.controls.startDate.value,'YYYY-MM-DD HH:mm:ss').toDate();
    // const startDate = moment(sDate).format('YYYY-MM-DD HH:mm:ss');
    // const dateNow = moment(dateTimeNow).format('YYYY-MM-DD HH:mm:ss');
    const startDate = Date.parse(group.controls.startDate.value);
    const endDate = Date.parse(group.controls.endDate.value);
    // console.log('dateTimeNow: '+dateTimeNow);
    // console.log('startDate: '+startDate);
    // console.log('endDate: '+endDate);

    return (startDate > dateTimeNow && startDate < endDate) ? null : { notSame: true };
  }

  reservationHouseByCurrentUser() {
    this.reservation = this.createReservationForm.value;
    // console.log(this.reservation);

    this.reservationService.createReservation(this.reservation).subscribe(
      (res) => {
        window.alert('Reservation successed!');
        this.route.navigate(['']);
        // window.alert(res.message);
      },
      (rej) => {
        window.alert('Reservation failed!');
        // window.alert(throwError(rej.message))
        // window.alert(rej.message);
      }
    );
  }

  getHouseById() {
    this.houseService.getHouseById(this.houseId).subscribe(
      (res) => {
        // console.log(res);
        this.house = res;
      },
      (rej) => {}
    );
  }

  get startDate() {
    return this.createReservationForm.get('startDate');
  }

  get endDate() {
    return this.createReservationForm.get('endDate');
  }
}
