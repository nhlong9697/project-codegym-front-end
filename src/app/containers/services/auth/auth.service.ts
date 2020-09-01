import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../../model/auth/signup.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../../model/auth/login-request.payload';
import { LoginResponse } from '../../model/auth/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { CommentPayload } from 'src/app/containers/model/home/description.payload';
import { PostModel } from 'src/app/containers/model/home/post-model';


import {environment} from '../../../../environments/environment';
import { houseCategoryModel } from '../../model/house-category/house-category';
import { City } from '../../model/city/city';
import {House} from '../../model/house/house';

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
        environment.URL +'api/auth/login',
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
      .post( environment.URL + 'api/auth/logout', this.refreshTokenPayload, {
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

   //TODO: sửa API
  getAllhouseCategory(): Observable<Array<houseCategoryModel>> {
    return this.httpClient.get<Array<houseCategoryModel>>(
      environment.URL + 'api/subreddit'
    );
  }

   //TODO: sửa API
  getAllCity(): Observable<Array<City>>{
    return this.httpClient.get<Array<City>>(
      environment.URL + 'api/subreddit'
    );
  }
   //TODO: sửa API
  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(
      environment.URL + 'api/comments/by-user/' + name
    );
  }
   //TODO: sửa API
  getAllHouseByUser(name: string): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(
      environment.URL + 'api/houses/by-user/' + name
    );
  }
  //TODO: sửa API
  getAllHouses(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(environment.URL + 'api/houses/');
  }


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
