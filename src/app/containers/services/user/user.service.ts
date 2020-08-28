import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http : HttpClient) { }

  createUser(data: User): Observable<User> {
    return this.http.post<User>(environment.URL + 'api/auth/signup', data);
  }
}
