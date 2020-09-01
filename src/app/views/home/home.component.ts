import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/containers/model/home/post-model';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import {HousesServiceService} from '../../containers/services/houses/houses-service.service';
import {HouseResponse} from '../../containers/model/house/house-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  houses: Array<HouseResponse> = [];
  constructor(private housesService: HousesServiceService) {
    this.housesService.getAllHouses().subscribe((houses) => {
      this.houses = houses;
    });
   }

  ngOnInit(): void {
  }

}
