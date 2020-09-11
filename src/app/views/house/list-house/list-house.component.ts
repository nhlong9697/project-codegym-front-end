import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import {HouseService} from '../../../containers/services/house/house.service';
import {HouseResponse} from '../../../containers/model/house/house-response';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SearchPayload} from '../../../containers/model/search/search.payload';

@Component({
  selector: 'app-home',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent implements OnInit {
  houses: Array<HouseResponse> = [];
  searchPayLoad: SearchPayload;
  constructor(
    private housesService: HouseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
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
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.searchPayLoad.name = params.get('name') === null ? '' : params.get('name');
      this.searchPayLoad.address = params.get('address') === null ? '' : params.get('address');
      this.searchPayLoad.houseCategoryId = parseInt(params.get('category'), 10);
      this.searchPayLoad.cityId = parseInt(params.get('city'), 10);
      this.searchPayLoad.price = parseInt(params.get('price'), 10);
      this.searchPayLoad.bathrooms = parseInt(params.get('bathrooms'),10);
      this.searchPayLoad.sleepingRooms = parseInt(params.get('bathrooms'),10);
      this.searchPayLoad.startDate = params.get('start');
      this.searchPayLoad.endDate = params.get('end');
      console.log(this.searchPayLoad);
      this.housesService.searchHouse(this.searchPayLoad).subscribe((data) => {
        this.houses = data;
        console.log(data);
      });
    });

   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.created !== undefined && params.created === 'true') {
        this.toastr.success('Upload new house successful');
      }
    });
  }

}
