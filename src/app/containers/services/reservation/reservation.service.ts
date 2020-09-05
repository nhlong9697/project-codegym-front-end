import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../../model/reservation/reservation';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url = environment.URL;

  constructor(private http: HttpClient) { }

  createProduct(data: any): Observable<any> {
    return this.http.post<any>(this.url + 'api/reservations', data);
  }

  getAllReservationByUsername(username: string): Observable<Array<Reservation>>{
    return this.http.get<Array<Reservation>>(
      this.url + 'api/reservations/by-username/' + username
    );
  }

  deleteReservationById(id: number): Observable<Reservation>{
    return this.http.delete<Reservation>(this.url + 'api/reservations/' + id);
  }

  updateReservationById(data: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(this.url + 'api/reservations/', data);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(this.url + 'api/reservations/' + id);
  }

  getReservationByHouseId(houseId: number): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>(this.url + 'api/reservations/by-house/' + houseId);
  }

}
