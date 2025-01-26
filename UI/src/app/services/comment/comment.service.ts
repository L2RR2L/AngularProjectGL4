import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { API } from '../../api';
import { map, Observable, of } from 'rxjs';
import { Comment } from '../../types/comments';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'any',
})
export class CommentService {
  comments = signal<Comment[]>([]);
  constructor(private http: HttpClient) {}
  getVideoComments(videoId: string) {
    this.http
      .get<{ comments: Comment[] }>(API.GetVideoComments(videoId))

      .subscribe((res) => {
        this.comments.set(res.comments);
      });
  }

  createVideoComments(comment: Partial<Comment>) {
    this.http
      .post<{
        comment: Comment;
      }>(API.createVideoComments(), comment)
      .subscribe((resp) => {
        const newComment = resp.comment;
        this.comments.set([newComment, ...this.comments()]);
      });
  }
}
