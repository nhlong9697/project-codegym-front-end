import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {houseCategoryModel} from '../../model/house-category/house-category';
import {City} from '../../model/city/city';
import {PostRequest} from '../../model/house/post-request';
import {HttpClient} from '@angular/common/http';
import {Form} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {PostResponse} from '../../model/house/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }
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

  createPost(data: PostRequest): Observable<any> {
    return this.httpClient.post(environment.URL + 'api/post/', data);
  }

  addPostImage(data: FormData): Observable<any> {
    return this.httpClient.post(environment.URL + 'api/images', data);
  }
  getAllPostsByUser(name: string): Observable<PostResponse[]> {
    return this.httpClient.get<PostResponse[]>(
      environment.URL + 'api/post/by-user/' + name
    );
  }
  //TODO: sửa API
  getAllPosts(): Observable<Array<PostResponse>> {
    return this.httpClient.get<Array<PostResponse>>(environment.URL + 'api/post/');
  }
}
