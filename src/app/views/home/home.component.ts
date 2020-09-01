import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import {HouseService} from '../../containers/services/post/house.service';
import {HouseResponse} from '../../containers/model/house/house-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: Array<HouseResponse> = [];
  constructor(private housesService: HouseService) {
    this.housesService.getAllHouse().subscribe((houses) => {
      this.houses = houses;
    });
   }

  ngOnInit(): void {
  }

}
