import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentPayload } from './../../model/comment/comment.payload';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  getAllCommentsForHouse(houseId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(
      environment.URL + 'api/comments/by-house/' + houseId
    );
  }

  postComment(commentPayload: CommentPayload): Observable<CommentPayload> {
    return this.httpClient.post<CommentPayload>(
      environment.URL + 'api/comments',
      commentPayload
    );
  }

  getAllCommentsByUser(username: string) {
    return this.httpClient.get<CommentPayload[]>(
      environment.URL + 'api/comments/by-house/' + username
    );
  }
}
