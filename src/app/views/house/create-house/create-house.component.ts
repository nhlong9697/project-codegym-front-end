import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HouseCategory} from 'src/app/containers/model/house-category/house-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import { City } from 'src/app/containers/model/city/city';
import { HouseRequest } from 'src/app/containers/model/house/house-request';
import {HouseService} from '../../../containers/services/house/house.service';
import {HouseResponse} from '../../../containers/model/house/house-response';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent implements OnInit {
  houseCategory: Array<HouseCategory>;
  allCity: Array<City>;
  createHouseForm: FormGroup;
  housePayLoad: HouseRequest;
  files: File[] = [];
  uploadPercent: Observable<number>;

  fileInfos: Observable<any>;
  constructor(  private router: Router,
                private houseService: HouseService,
                private storage: AngularFireStorage
  ) {
      this.housePayLoad = {
        houseName: '',
        houseCategory: '',
        cityName: '',
        address: '',
        price: 0,
        description: ''
      };
    }


  ngOnInit(): void {
    this.createHouseForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      HouseCategory: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
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

  discardPost(): void {
    this.router.navigateByUrl('/');
  }
  createHouse(): void {
    this.housePayLoad.houseName = this.createHouseForm.get('Name').value;
    this.housePayLoad.address = this.createHouseForm.get('Address').value;
    this.housePayLoad.houseCategory = this.createHouseForm.get('HouseCategory').value;
    this.housePayLoad.cityName = this.createHouseForm.get('City').value;
    this.housePayLoad.price = this.createHouseForm.get('Price').value;
    this.housePayLoad.description = this.createHouseForm.get('Description').value;
    this.houseService.createHouse(this.housePayLoad).subscribe(
      (data) => {
        const house: HouseResponse = data;
        console.log(data);
        for (let i = 0; i < this.files.length; i++) {
          this.upload(i, this.files[i], house.houseId);
        }
      },
      (error) => {
        throwError(error);
      }
    );
    this.router.navigate(['/'], {
      queryParams: { created: 'true' },
    });
   }

  onSelect(event): void {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event): void {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  private upload(i: number, file: File, houseId: number) {
  }
}
