import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HouseCategory} from 'src/app/containers/model/house-category/house-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import { City } from 'src/app/containers/model/city/city';
import { HouseRequest } from 'src/app/containers/model/house/house-request';
import {HouseService} from '../../../containers/services/house/house.service';
import {HouseResponse} from '../../../containers/model/house/house-response';
import {AngularFireStorage} from '@angular/fire/storage';
import {v4 as uuid} from 'uuid';
import {finalize} from 'rxjs/operators';
import {ImageService} from '../../../containers/services/images/image.service';
import {ImagePayload} from '../../../containers/model/image/image';
import { ToastrService } from 'ngx-toastr';



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
  uploadPercents: Observable<number>[] = [];

  fileInfos: Observable<any>;
  constructor(  private router: Router,
                private houseService: HouseService,
                private storage: AngularFireStorage,
                private imageService: ImageService,
                private toastr: ToastrService,

  ) {
      this.housePayLoad = {
        name: '',
        houseCategory: 0,
        city: 0,
        address: '',
        price: 0,
        description: '',
        bathrooms: 0,
        sleepingRooms: 0
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
      Bathrooms: new FormControl(''),
      SleepingRooms: new FormControl('')
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
        // console.log(data);
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
    this.housePayLoad.name = this.createHouseForm.get('Name').value;
    this.housePayLoad.address = this.createHouseForm.get('Address').value;
    this.housePayLoad.houseCategory = this.createHouseForm.get('HouseCategory').value;
    this.housePayLoad.city = this.createHouseForm.get('City').value;
    this.housePayLoad.price = this.createHouseForm.get('Price').value;
    this.housePayLoad.description = this.createHouseForm.get('Description').value;
    this.housePayLoad.bathrooms = this.createHouseForm.get('Bathrooms').value;
    this.housePayLoad.sleepingRooms = this.createHouseForm.get('SleepingRooms').value;
    this.houseService.createHouse(this.housePayLoad).subscribe(
      (data) => {
        const house: HouseResponse = data;
        console.log(data);
        let i = 0;
        for (; i < this.files.length; i++) {
          this.upload(i, this.files[i], house.id, this.files.length);
          console.log(1);
        }
        this.toastr.success('Create house successfully');
        this.router.navigate(['']);
      },
      (error) => {
        this.toastr.success('Create house successfully');
        throwError(error);
      }
    );
   }

  onSelect(event): void {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event): void {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  private upload(i: number, file: File, houseId: number, size: number): void {
    const filePath = `houses/${Date.now()}_${uuid()}`;
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercents[i] = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        const image = new ImagePayload();
        image.houseId = houseId;
        image.ref = filePath;
        this.imageService.addHouseImage(image).subscribe();
        if (i === size - 1){
          this.router.navigate(['/'], {
            queryParams: { created: 'true' },
          });
        }
      })
    ).subscribe();
  }
}
