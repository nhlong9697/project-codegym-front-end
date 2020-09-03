import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  utl = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  createProduct(data: any): Observable<any> {
    return this.http.post<any>(this.utl + 'reservations', data);
  }
}
