import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchPayload} from '../../containers/model/search/search.payload';
import {City} from '../../containers/model/city/city';
import {Router} from '@angular/router';
import {HouseService} from '../../containers/services/house/house.service';
import {throwError} from 'rxjs';
import {HouseCategory} from '../../containers/model/house-category/house-category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchFromGroup: FormGroup;
  searchPayLoad: SearchPayload;
  houseCategory: Array<HouseCategory>;
  allCity: Array<City>;
  constructor(
    private router: Router,
    private houseService: HouseService
  ) {
    this.searchPayLoad = {
      houseCategoryId: 0,
      cityId: 0,
      address: '',
      name: '',
      bathrooms: 0,
      sleepingRooms: 0,
      price: 0,
      startDate: '',
      endDate: '',
    };
  }

  ngOnInit(): void {

    this.searchFromGroup = new FormGroup({
      City: new FormControl('', Validators.required),
    });
    this.houseService.getAllHouseCategory().subscribe(
      (data) => {
        this.houseCategory = data;
      },
      (error) => {
        throwError(error);
      }
    );

    this.houseService.getAllCity().subscribe(
      (data) => {
        this.allCity = data;
        console.log(data);
      },
      (error) => {
        throwError(error);
      }
    );
  }

}
