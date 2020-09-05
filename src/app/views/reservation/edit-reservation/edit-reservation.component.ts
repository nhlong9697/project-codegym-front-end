import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/containers/services/reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HouseService } from 'src/app/containers/services/house/house.service';
import { Reservation } from 'src/app/containers/model/reservation/reservation';
import { HouseResponse } from 'src/app/containers/model/house/house-response';
// import {Moment} from 'moment/moment';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
  updateReservationForm: FormGroup;
  reservation: Reservation;
  house: HouseResponse;
  reservationId = +this.activateRouter.snapshot.paramMap.get('id');
  // moment: Moment;



  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private route: Router,
    private activateRouter: ActivatedRoute,
    private houseService: HouseService) {
      this.reservation ={
        id:0,
        startDate:'',
        endDate:'',
        houseId:0,
        username:''
      }
    }

  ngOnInit(): void {
    this.getReservationById();

    this.updateReservationForm = this.fb.group({
      id: [this.reservationId],
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
      houseId: [this.reservation.houseId,[Validators.required]],
      username:[this.reservation.username]
    })
  }

  updateReservationById(){
    this.reservation = this.updateReservationForm.value;
    // console.log(this.reservation);

    this.reservationService.updateReservationById(this.reservation).subscribe((res) =>{
      window.alert("Update reservation successed!");
      // this.route.navigate([''])
      // window.alert(res.message);
    },
    (rej)=>{
      window.alert('Update reservation failed!')
      // window.alert(rej.message);
    });

  }

  getReservationById(){
    this.reservationService.getReservationById(this.reservationId).subscribe((res)=>{
      // console.log(res);
      this.reservation = res;
      this.reservation.startDate = moment(this.reservation.startDate).format('YYYY-MM-DDTHH:mm');
      this.reservation.endDate = moment(this.reservation.endDate).format('YYYY-MM-DDTHH:mm');
      this.updateReservationForm.patchValue(this.reservation);
      this.getHouseById();
    },
    (rej) => {

    })
  }

  getHouseById(){
    this.houseService.getHouseById(this.reservation.houseId).subscribe((res)=>{
      // console.log(res);
      this.house = res;
    },
    (rej) => {

    })
  }

  get startDate(){
    return this.updateReservationForm.get('startDate');
  }

  get endDate(){
    return this.updateReservationForm.get('endDate');
  }

}
