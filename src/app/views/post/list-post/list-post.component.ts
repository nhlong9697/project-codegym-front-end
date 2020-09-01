import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/containers/model/house/house';
import { HouseService } from 'src/app/containers/services/house/house.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  houseList: any;

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.getAllHouses();
  }

  getAllHouses = () => {
    this.houseService.getAllHouses().subscribe(res =>{
      this.houseList = res;
      debugger
      console.log(res);
    })
  }

}
