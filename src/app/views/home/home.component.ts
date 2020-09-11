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
  request: object = new Object();
  constructor(
    private router: Router,
    private houseService: HouseService
  ) {
    console.log('constructor rq');
    console.log(this.request);
  }

  ngOnInit(): void {
    this.searchFrom = new FormGroup({
      cityId: new FormControl(''),
      houseCategoryId: new FormControl(''),
      address: new FormControl(''),
      name: new FormControl(''),
      bathrooms: new FormControl(''),
      sleepingRooms: new FormControl(''),
      price: new FormControl(''),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
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
    if (this.searchFrom.get('name').value !== '') {
      this.request['name'] = this.searchFrom.get('name').value;
    }
    if (this.searchFrom.get('address').value !== '') {
      this.request['address'] = this.searchFrom.get('address').value;
    }
    if (this.searchFrom.get('houseCategoryId').value !== '') {
      this.request['category'] = this.searchFrom.get('houseCategoryId').value;
    }
    if (this.searchFrom.get('cityId').value !== '') {
      this.request['city'] = this.searchFrom.get('cityId').value;
    }
    if (this.searchFrom.get('price').value !== '') {
      this.request['price'] = this.searchFrom.get('price').value;
    }
    if (this.searchFrom.get('bathrooms').value !== '') {
      this.request['bathrooms'] = this.searchFrom.get('bathrooms').value;
    }
    if (this.searchFrom.get('sleepingRooms').value !== '') {
      this.request['sleepingrooms'] = this.searchFrom.get('sleepingRooms').value;
    }
    if (this.searchFrom.get('startDate').value !== '') {
      this.request['start'] = this.searchFrom.get('startDate').value;
    }
    if (this.searchFrom.get('endDate').value !== '') {
      this.request['end'] = this.searchFrom.get('endDate').value;
    }
    console.log('request');
    console.log(this.request);
    this.router.navigate(
      ['/houses'],
        {queryParams: this.request}
      );
  }
}
