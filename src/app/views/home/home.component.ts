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
    console.log('search');
    this.router.navigate(
      ['/houses'],
        {queryParams:
            {
            name: this.searchFrom.get('name').value,
            address: this.searchFrom.get('address').value,
            category: this.searchFrom.get('houseCategoryId').value,
            city: this.searchFrom.get('cityId').value,
            price: this.searchFrom.get('price').value,
            bathrooms: this.searchFrom.get('bathrooms').value,
            sleepingrooms: this.searchFrom.get('sleepingRooms').value,
            start: this.searchFrom.get('startDate').value,
            end: this.searchFrom.get('endDate').value
          }
        }
      );
  }
}
