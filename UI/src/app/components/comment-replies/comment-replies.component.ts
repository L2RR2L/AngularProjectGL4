import {
  Component,
  computed,
  forwardRef,
  input,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { Comment } from '../../types/comments';
import { CommentComponent } from '../comment/comment.component';
import { CommentService } from '../../services/comment/comment.service';

@Component({
  selector: 'app-comment-replies',
  standalone: true,
  imports: [forwardRef(() => CommentComponent)],
  templateUrl: './comment-replies.component.html',
  styleUrl: './comment-replies.component.css',
})
export class CommentRepliesComponent {
  parentCommentId = input<string>();

  numberOfReplies: Signal<number>;
  isReplied = computed(() => this.numberOfReplies() > 0);
  isOpen = false;
  replies: Signal<Comment[]>;

  constructor(protected commentService: CommentService) {
    this.replies = computed(() => {
      return this.commentService
        .comments()
        .filter((comment) => comment.commentTo == this.parentCommentId());
    });
    this.numberOfReplies = computed(() => this.replies().length);
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
