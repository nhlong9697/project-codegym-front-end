import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {City} from '../../model/city/city';
import {HouseRequest} from '../../model/house/house-request';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {HouseResponse} from '../../model/house/house-response';
import {HouseCategory} from '../../model/house-category/house-category';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private httpClient: HttpClient) { }
  getAllHouseCategory(): Observable<Array<HouseCategory>> {
    return this.httpClient.get<Array<HouseCategory>>(
      environment.URL + 'api/houses/show-all-houseCategory'
    );
  }

  //TODO: sửa API
  getAllCity(): Observable<Array<City>>{
    return this.httpClient.get<Array<City>>(
      environment.URL + 'api/houses/show-all-city'
    );
  }
  createHouse(data: HouseRequest): Observable<any> {
    return this.httpClient.post(environment.URL + 'api/houses/', data);
  }

  addHouseImage(data: FormData): Observable<any> {
    return this.httpClient.post(environment.URL + 'api/images', data);
  }
  getAllHouseByUser(name: string): Observable<HouseResponse[]> {
    return this.httpClient.get<HouseResponse[]>(
      environment.URL + 'api/house/by-user/' + name
    );
  }
  //TODO: sửa API
  getAllHouse(): Observable<Array<HouseResponse>> {
    return this.httpClient.get<Array<HouseResponse>>(environment.URL + 'api/houses/');
  }
}
