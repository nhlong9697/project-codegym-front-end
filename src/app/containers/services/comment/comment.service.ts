import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { CommentPayload } from '../../model/comment/comment.payload';
@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getAllCommentsForHouse(houseId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(
      environment.URL + 'api/comments/by-post/' + houseId
    );
  }

  houseComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(
      environment.URL + 'api/comments/',
      commentPayload
    );
  }

  getAllCommentsByUser(username: string) {
    return this.httpClient.get<CommentPayload[]>(
      environment.URL + 'api/comments/by-user/' + username
    );
  }
}
