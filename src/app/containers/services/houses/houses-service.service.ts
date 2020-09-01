import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {houseCategoryModel} from '../../model/house-category/house-category';
import {City} from '../../model/city/city';
import {House} from '../../model/house/house';
import {HttpClient} from '@angular/common/http';
import {Form} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {PostModel} from '../../model/home/post-model';
import {HouseResponse} from '../../model/house/house-response';

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
  getAllHouseByUser(name: string): Observable<HouseResponse[]> {
    return this.httpClient.get<HouseResponse[]>(
      environment.URL + 'api/houses/by-user/' + name
    );
  }
  //TODO: sửa API
  getAllHouses(): Observable<Array<HouseResponse>> {
    return this.httpClient.get<Array<HouseResponse>>(environment.URL + 'api/houses/');
  }
}
