import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignupRequestPayload } from '../../model/auth/signup.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../../model/auth/login-request.payload';
import { LoginResponse } from '../../model/auth/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { UpdateUserRequest } from 'src/app/containers/model/auth/update-user-request';
import {environment} from '../../../../environments/environment';
import { UserPassword } from '../../model/auth/user-password';

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

   //TODO: sửa API

   //TODO: sửa API


  getAllAuth(): Observable< Array< SignupRequestPayload >> {
    return this.httpClient.get<Array<SignupRequestPayload>>('http://localhost:8080/api/auth/users');
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

  getUserById(id: number): Observable<UpdateUserRequest> {
    return this.httpClient.get<UpdateUserRequest>(environment.URL+"api/auth/users/" + id);
  }

  getUserByUsername(username: string): Observable<UpdateUserRequest> {
    return this.httpClient.get<UpdateUserRequest>(environment.URL+"api/auth/users/" + username);
  }

  updateUser (data : UpdateUserRequest) :Observable<UpdateUserRequest> {
    return this.httpClient.put<UpdateUserRequest>(environment.URL + "api/auth/users", data)
  }

  changePasswordUser(data: UserPassword) :Observable<UserPassword>{
    return this.httpClient.put<UserPassword>(environment.URL + "api/auth/users/change-pass", data)
  }
}
