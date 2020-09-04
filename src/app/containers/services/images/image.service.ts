import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {ImagePayload} from '../../model/image/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) {
  }

  getAllImagesForHouse(houseId: number): Observable<ImagePayload[]> {
    return this.httpClient.get<any[]>(
      environment.URL + 'api/images/by-house/' + houseId
    );
  }
  addHouseImage(data: ImagePayload): Observable<any> {
    return this.httpClient.post(environment.URL + 'api/images', data);
  }
}
