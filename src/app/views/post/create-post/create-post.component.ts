import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { houseCategoryModel } from 'src/app/containers/model/house-category/house-category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import { City } from 'src/app/containers/model/city/city';
import { PostRequest } from 'src/app/containers/model/house/post-request';
import {PostService} from '../../../containers/services/post/post.service';
import {PostResponse} from '../../../containers/model/house/post-response';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  houseCategory: Array<houseCategoryModel>;
  allCity: Array<City>;
  createHouseForm: FormGroup;
  postPayLoad: PostRequest;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;
  constructor(  private router: Router,
                private postService: PostService) {
      this.postPayLoad = {
        name: '',
        houseCategory: '',
        city: '',
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
      // Prive: new FormControl('', Validators.required),
      // Description: new FormControl('', Validators.required),
    });
    this.postService.getAllhouseCategory().subscribe(
      (data) => {
        this.houseCategory = data;
      },
      (error) => {
        throwError(error);
      }
    );
    this.postService.getAllCity().subscribe(
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
      this.postService.createPost(this.postPayLoad).subscribe(
        (data) => {
          const house: PostResponse = data;
          for (let i = 0; i < this.selectedFiles.length; i++) {
            this.upload(i, this.selectedFiles[i], house.houseId);
          }
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

  private upload(i: number, selectedFile: File, houseId: number) {
    const formData = new FormData();
    formData.append('file', this.selectedFiles[i]);
    formData.append('houseId', houseId.toString());
    this.progressInfos[i] = { value: 0, fileName: selectedFile.name };
    this.postService.addPostImage(formData).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[i].percentage = Math.round(100 * event.loaded / event.total);
        }
      },
      err => {
        this.progressInfos[i].percentage = 0;
        this.message = 'Could not upload the file:' + selectedFile.name;
      }
    );
  }
}
