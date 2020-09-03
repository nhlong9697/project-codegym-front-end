import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReservationService } from 'src/app/containers/services/reservation/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
  createReservationForm: FormGroup;

  constructor(private fb: FormBuilder,
    private reservationService: ReservationService,
    private route: Router) { }

  ngOnInit(): void {
    this.createReservationForm = this.fb.group({
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]],
      houseId: ['2',[Validators.required]]
    })
  }

  reservationHouseByCurrentUser(){
    let data = this.createReservationForm.value;
    console.log(data);

    this.reservationService.createProduct(data).subscribe((res) =>{
      window.alert("Reservation successed!");
      // this.route.navigate([''])
    },
    (rej)=>{
      window.alert('Reservation failed!')
    });
  }

  get startDate(){
    return this.createReservationForm.get('startDate')
  }

  get endDate(){
    return this.createReservationForm.get('endDate')
  }

}
