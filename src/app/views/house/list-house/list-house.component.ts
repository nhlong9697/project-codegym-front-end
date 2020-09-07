import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import {HouseService} from '../../../containers/services/house/house.service';
import {HouseResponse} from '../../../containers/model/house/house-response';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './list-house.component.html',
  styleUrls: ['./list-house.component.css']
})
export class ListHouseComponent implements OnInit {
  houses: Array<HouseResponse> = [];
  constructor(
    private housesService: HouseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.housesService.getAllHouse().subscribe((houses) => {
      this.houses = houses;
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
