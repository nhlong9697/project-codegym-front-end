import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {Image} from '../../model/image/image';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) {
  }

  getAllImagesForHouse(houseId: number): Observable<Image[]> {
    return this.httpClient.get<any[]>(
      environment.URL + 'api/by-house/' + houseId
    );
  }
  addHouseImage(data: Image): Observable<any> {
    return this.httpClient.post(environment.URL + 'api/images', data);
  }
}
