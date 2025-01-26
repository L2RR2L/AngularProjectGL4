import {
  Component,
  computed,
  effect,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentComponent } from '../comment/comment.component';
import { Comment } from '../../types/comments';
import { CommentService } from '../../services/comment/comment.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommentFormComponent, CommentComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  providers: [CommentService],
})
export class CommentsComponent implements OnInit {
  comments: Signal<Comment[]>;

  videoId = input<string>('', {
    alias: 'video_id',
  });

  constructor(protected commentService: CommentService) {
    this.comments = computed(() => {
      return commentService.comments().filter((comment) => {
        return comment.commentTo == null;
      });
    });
  }
  ngOnInit(): void {
    this.commentService.getVideoComments(this.videoId());
  }
}
