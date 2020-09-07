import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchPayload} from '../../containers/model/search/search.payload';
import {City} from '../../containers/model/city/city';
import {Router} from '@angular/router';
import {HouseService} from '../../containers/services/house/house.service';
import {throwError} from 'rxjs';
import {HouseCategory} from '../../containers/model/house-category/house-category';
import {HouseResponse} from '../../containers/model/house/house-response';

function timeDateValidator(group: FormGroup): any {
  const dateTimeNow = Date.now();
  // const startDate = moment(group.controls.startDate.value,'YYYY-MM-DD HH:mm:ss').toDate();
  // const startDate = moment(sDate).format('YYYY-MM-DD HH:mm:ss');
  // const dateNow = moment(dateTimeNow).format('YYYY-MM-DD HH:mm:ss');
  const startDate = Date.parse(group.get('startDate').value);
  const endDate = Date.parse(group.get('endDate').value);
  // console.log('dateTimeNow: '+dateTimeNow);
  // console.log('startDate: '+startDate);
  // console.log('endDate: '+endDate);

  return (startDate > dateTimeNow && startDate < endDate) ? null : { notSame: true };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchFrom: FormGroup;
  searchPayLoad: SearchPayload;
  houseCategories: Array<HouseCategory>;
  cities: Array<City>;
  constructor(
    private router: Router,
    private houseService: HouseService
  ) {
    this.searchPayLoad = {
      houseCategoryId: null,
      cityId: null,
      address: null,
      name: null,
      bathrooms: null,
      sleepingRooms: null,
      price: null,
      startDate: null,
      endDate: null
    };
  }

  ngOnInit(): void {

    this.searchFrom = new FormGroup({
      cityId: new FormControl('', Validators.required),
      houseCategoryId: new FormControl(''),

      address: new FormControl(''),
      name: new FormControl(''),
      bathrooms: new FormControl(''),
      sleepingRooms: new FormControl(''),
      price: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    }, timeDateValidator);
    this.houseService.getAllHouseCategory().subscribe(
      (data) => {
        this.houseCategories = data;
      },
      (error) => {
        throwError(error);
      }
    );

    this.houseService.getAllCity().subscribe(
      (data) => {
        this.cities = data;
        console.log(data);
      },
      (error) => {
        throwError(error);
      }
    );
  }

  searchHouse(): void {
    console.log('search');
    this.searchPayLoad.name = this.searchFrom.get('name').value;
    this.searchPayLoad.address = this.searchFrom.get('address').value;
    this.searchPayLoad.houseCategoryId = this.searchFrom.get('houseCategoryId').value;
    this.searchPayLoad.cityId = this.searchFrom.get('cityId').value;
    this.searchPayLoad.price = this.searchFrom.get('price').value;
    this.searchPayLoad.bathrooms = this.searchFrom.get('bathrooms').value;
    this.searchPayLoad.sleepingRooms = this.searchFrom.get('sleepingRooms').value;
    this.searchPayLoad.startDate = this.searchFrom.get('startDate').value;
    this.searchPayLoad.endDate = this.searchFrom.get('endDate').value;
    this.router.navigate(
      ['/houses'],
      {queryParams:
          {
            name: this.searchPayLoad.name,
            address: this.searchPayLoad.address,
            category: this.searchPayLoad.houseCategoryId,
            city: this.searchPayLoad.cityId,
            price: this.searchPayLoad.price,
            bathrooms: this.searchPayLoad.bathrooms,
            sleepingrooms: this.searchPayLoad.sleepingRooms,
            start: this.searchPayLoad.startDate,
            end: this.searchPayLoad.endDate
          }
      }
      );
  }
}
