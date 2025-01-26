import { Component, computed, input, output, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment/comment.service';
import { Comment } from '../../types/comments';
import { AuthService } from '../../services/auth/auth.service';
import {
  selectCurrentChannel,
  selectIsAuthenticated,
} from '../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Channel } from '../../types/channel';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  videoId = input<string>();
  commentTo = input<string>();
  submitted = output<boolean>();
  toast = toast;
  comment = '';
  userId = '';
  channelImg = computed(() => {
    return this.currentChannel()?.imageLink || '/assets/anonymos.png';
  });
  isAuthenticated: Signal<boolean | undefined>;
  currentChannel: Signal<Channel | undefined | null>;

  constructor(
    protected commentService: CommentService,
    private store: Store<AppState>
  ) {
    this.isAuthenticated = toSignal(this.store.select(selectIsAuthenticated));
    this.currentChannel = toSignal(this.store.select(selectCurrentChannel));
  }

  handleSubmit() {
    console.log(this.isAuthenticated());

    if (!this.isAuthenticated()) {
      this.toast.info('You need to be logged in to comment');
      this.comment = '';

      return;
    }
    const newCommentBody: Partial<Comment> = {};
    newCommentBody.content = this.comment;
    newCommentBody.commentTo =
      this.commentTo() == '' ? undefined : this.commentTo();
    newCommentBody.videoId = this.videoId();
    newCommentBody.commentBy = this.currentChannel()?.id;
    console.log(newCommentBody);
    this.commentService.createVideoComments(newCommentBody);
    this.submitted.emit(true);
    this.comment = '';
  }
}
