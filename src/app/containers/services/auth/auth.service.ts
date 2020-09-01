import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignupRequestPayload } from '../../model/auth/signup.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../../model/auth/login-request.payload';
import { LoginResponse } from '../../model/auth/login-response.payload';
import { map, tap } from 'rxjs/operators';
<<<<<<< HEAD
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/empty';
// import 'rxjs/add/operator/retry';
=======
import { House } from 'src/app/containers/model/house/house'
>>>>>>> dev


import {environment} from '../../../../environments/environment';
import { houseCategoryModel } from '../../model/house-category/house-category';
import { City } from '../../model/city/city';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName(),
  };



  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      environment.URL + 'api/auth/signup',
      signupRequestPayload,
      {
        responseType: 'text',
      }
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(
        environment.URL + 'api/auth/login',
        loginRequestPayload
      )
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }

  getJwtToken(): string {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken(): Observable<any> {
    return this.httpClient
      .post<LoginResponse>(
        environment.URL + 'api/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');

          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  logout(): void {
    this.httpClient
      .post(environment.URL + 'api/auth/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          throwError(error);
        }
      );
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

<<<<<<< HEAD
  getAllAuth(): Observable< Array< SignupRequestPayload >> {
    return this.httpClient.get<Array<SignupRequestPayload>>('http://localhost:8080/api/auth/users');
  }

=======
  //nhờ anh long sửa
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

  createHouse(postPayLoad: House): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/posts/', postPayLoad);
  }
>>>>>>> dev

  getUserName(): string {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken(): string {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
