import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
  createReservationForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
