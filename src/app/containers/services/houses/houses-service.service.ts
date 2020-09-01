import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {houseCategoryModel} from '../../model/house-category/house-category';
import {City} from '../../model/city/city';
import {House} from '../../model/house/house';
import {HttpClient} from '@angular/common/http';
import {Form} from '@angular/forms';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HousesServiceService {

  constructor(private httpClient:HttpClient) { }
  getAllhouseCategory(): Observable<Array<houseCategoryModel>> {
    return this.httpClient.get<Array<houseCategoryModel>>(
      'http://localhost:8080/api/subreddit'
    );
  }

  //nhờ anh long sửa
  getAllCity(): Observable<Array<City>>{
    return this.httpClient.get<Array<City>>(
      'http://localhost:8080/api/subreddit'
    );
  }

  createHouse(data: House): Observable<any> {
    return this.httpClient.post(environment.URL + 'api/houses/', data);
  }

  addHouseImage(data: FormData): Observable<any> {
    return this.httpClient.post(environment.URL + 'api/images', data);
  }
}
