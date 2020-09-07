import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {City} from '../../model/city/city';
import {HouseRequest} from '../../model/house/house-request';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {HouseResponse} from '../../model/house/house-response';
import {HouseCategory} from '../../model/house-category/house-category';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private httpClient: HttpClient) { }
  getAllHouseCategory(): Observable<Array<HouseCategory>> {
    return this.httpClient.get<Array<HouseCategory>>(
      environment.URL + 'api/houses/show-all-house-category'
    );
  }

  getAllCity(): Observable<Array<City>>{
    return this.httpClient.get<Array<City>>(
      environment.URL + 'api/houses/show-all-city'
    );
  }

  createHouse(data: HouseRequest): Observable<any> {
    return this.httpClient.post(environment.URL + 'api/houses/', data);
  }


  getAllHouseByUser(name: string): Observable<HouseResponse[]> {
    return this.httpClient.get<HouseResponse[]>(
      environment.URL + 'api/houses/by-user/' + name
    );
  }


  getHouse(houseId: number): Observable<HouseResponse> {
    return this.httpClient.get<HouseResponse>(environment.URL + 'api/houses/' + houseId);
  }
  getAllHouse(): Observable<Array<HouseResponse>> {
    return this.httpClient.get<Array<HouseResponse>>(environment.URL + 'api/houses/');
  }

  getHouseById(id: number): Observable<HouseResponse> {
    return this.httpClient.get<HouseResponse>(environment.URL + 'api/houses/'+id);
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  deleteHouseById(id: number): Observable<number>{
    return this.httpClient.delete<number>(environment.URL + 'api/houses/' + id);
  }
}
