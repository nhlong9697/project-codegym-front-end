import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HouseService {
  url = "http://localhost:8080/api/";

  constructor(public http: HttpClient) { }

  getAllHouses = () :Observable<any> => {
    return this.http.get(this.url + 'houses');
  }
}
