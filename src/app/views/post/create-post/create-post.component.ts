import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { houseCategoryModel } from 'src/app/containers/model/house-category/house-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import { City } from 'src/app/containers/model/city/city';
import { House } from 'src/app/containers/model/house/house';
import {HousesServiceService} from '../../../containers/services/houses/houses-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  houseCategory: Array<houseCategoryModel>;
  allCity: Array<City>;
  createHouseForm: FormGroup;
  postPayLoad: House;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;
  constructor(  private router: Router,
    private houseService: AuthService) {
      this.postPayLoad = {
        name:'',
        houseCategory:'',
        city:'',
        address:'',
        price:0,
        description:''
      }
    }


  ngOnInit(): void {
    this.createHouseForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      HouseCategory: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Address: new FormControl('', Validators.required),
      // Prive: new FormControl('', Validators.required),
      // Description: new FormControl('', Validators.required),
    });
    this.houseService.getAllhouseCategory().subscribe(
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
      },
      (error) => {
        throwError(error);
      }
    );
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
   createHouse() {
      this.postPayLoad.name = this.createHouseForm.get('name').value;
      this.postPayLoad.address = this.createHouseForm.get('address').value;
      this.postPayLoad.houseCategory = this.createHouseForm.get('houseCategory').value;
      this.postPayLoad.city = this.createHouseForm.get('city').value;
      this.postPayLoad.price = this.createHouseForm.get('price').value;
      this.postPayLoad.description = this.createHouseForm.get('description').value;
      const formData = new FormData();
      formData.append('postPayLoad', JSON.stringify(this.postPayLoad));
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.progressInfos[i] = { value: 0, fileName: this.selectedFiles[i].name };
        formData.append(i.toString(), this.selectedFiles[i]);
      }
      this.houseService.createHouse(formData).subscribe(
        (data) => {
          this.router.navigateByUrl('/');
        },
        (error) => {
          throwError(error);
        }
      );
    }

  selectFiles(event): void {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
    }
  }
}
