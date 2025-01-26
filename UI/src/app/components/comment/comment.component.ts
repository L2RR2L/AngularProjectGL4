import { Component, input } from '@angular/core';
import moment from 'moment';
import { Comment } from '../../types/comments';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentRepliesComponent } from '../comment-replies/comment-replies.component';
import { LikeDislikesComponent } from '../like-dislikes/like-dislikes.component';
import { OnHoverClassDirective } from '../../directives/hover/on-hover-class.directive';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommentFormComponent,
    CommentRepliesComponent,
    LikeDislikesComponent,
    OnHoverClassDirective,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  comment = input<Comment>({
    id: '',
    content: '',
    commentBy: '',
    commentTo: '',
    videoId: '',
    createdAt: new Date(),
    channelImg: '',
    channelName: '',
  });
  isReplyOpen = false;
  isAuth = false;

  constructor() {}

  formatTimeAgo(date?: Date): string {
    if (!date) return '';
    return moment(date).fromNow();
  }

  handleReplyClick() {
    this.isReplyOpen = !this.isReplyOpen;
  }

  handleReplyComment() {
    this.isReplyOpen = false;
  }
}
