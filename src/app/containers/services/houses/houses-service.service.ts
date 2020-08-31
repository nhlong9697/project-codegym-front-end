import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {houseCategoryModel} from '../../model/house-category/house-category';
import {City} from '../../model/city/city';
import {House} from '../../model/house/house';
import {HttpClient} from '@angular/common/http';

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

  createHouse(data: FormData): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/posts/', data);
  }
}
