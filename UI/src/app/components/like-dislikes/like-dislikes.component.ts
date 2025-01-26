import { NgClass } from '@angular/common';
import {
  Component,
  effect,
  input,
  OnInit,
  Signal,
  signal,
  untracked,
} from '@angular/core';
import { LikeDislikesService } from '../../services/like-dislikes/like-dislikes.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import { toast } from 'ngx-sonner';

interface Rating {
  likes: number;
  dislikes: number;
}

@Component({
  selector: 'app-like-dislikes',
  standalone: true,
  imports: [NgClass],
  templateUrl: './like-dislikes.component.html',
})
export class LikeDislikesComponent implements OnInit {
  size = input<string>('');
  showDislikes = input<boolean>();
  type = input<'video' | 'comment'>('comment');
  id = input<string>('');
  videoId = input<string>('');
  isAuthenticated: Signal<boolean | undefined>;
  toast = toast;
  rating = signal<number | null>(0);
  dislikes = signal<number>(0);
  likes = signal<number>(0);

  private options = [-1, 1]; // Dislike, Like

  constructor(
    protected likeDislikesService: LikeDislikesService,
    private store: Store<AppState>
  ) {
    this.isAuthenticated = toSignal(this.store.select(selectIsAuthenticated));
    effect(() => {
      if (!this.isAuthenticated()) untracked(() => this.rating.set(null));
    });
  }

  ngOnInit(): void {
    this.fetchRating().then((res) => {
      this.likes.set(res.ratings.likes);
      this.dislikes.set(res.ratings.dislikes);
    });
    if (this.isAuthenticated()) {
      this.fetchUserRating().then((resp) => {
        if (!resp) {
          this.rating.set(null);
          return;
        }
        this.rating.set(resp.rating);
      });
    }
  }

  fetchRating() {
    return this.likeDislikesService.fetchRating(
      this.type(),
      this.id(),
      this.videoId()
    );
  }

  fetchUserRating() {
    return this.likeDislikesService.fetchUserRating(
      this.type(),
      this.id(),
      this.videoId()
    );
  }
  getRating(option: number): number {
    return this.options[option];
  }

  async handleThumbClick(newRating: number) {
    if (this.isAuthenticated()) {
      if (!this.rating()) {
        await this.likeDislikesService.createUserRating(
          this.type(),
          this.id(),
          this.videoId(),
          newRating
        );
        if (newRating > 0) {
          this.likes.set(this.likes() + 1);
        } else {
          this.dislikes.set(this.dislikes() + 1);
        }
        this.rating.set(newRating);
      } else if (this.rating() && newRating !== this.rating()) {
        await this.likeDislikesService.updateUserRating(
          this.type(),
          this.id(),
          this.videoId(),
          newRating
        );
        if (this.rating()! > 0) {
          this.dislikes.set(this.dislikes() + 1);
          this.likes.set(this.likes() - 1);
        } else {
          this.dislikes.set(this.dislikes() - 1);
          this.likes.set(this.likes() + 1);
        }
        this.rating.set(newRating);
      } else {
        await this.likeDislikesService.deleteUsersRating(
          this.type(),
          this.id(),
          this.videoId()
        );
        if (this.rating()! > 0) {
          this.likes.set(this.likes() - 1);
        } else {
          this.dislikes.set(this.dislikes() - 1);
        }
        this.rating.set(null);
      }
    } else {
      this.toast.info('You need to be logged in to like or dislike');
    }
  }

  // updateCounts(
  //   newRating: number,
  //   isNew: boolean,
  //   isDelete: boolean = false
  // ): void {
  //   if (isDelete) {
  //     if (this.rating() > 0) {
  //       this.likes.set(this.likes() - 1);
  //     } else {
  //       this.dislikes.set(this.dislikes() - 1);
  //     }
  //   } else if (isNew) {
  //     if (newRating > 0) {
  //       this.likes.set(this.likes() + 1);
  //     } else {
  //       this.dislikes.set(this.dislikes() + 1);
  //     }
  //   } else {
  //     if (this.rating() > 0) {
  //       this.likes.set(this.likes() - 1);
  //       this.dislikes.set(this.dislikes() + 1);
  //     } else {
  //       this.dislikes.set(this.dislikes() - 1);
  //       this.likes.set(this.likes() + 1);
  //     }
  //   }
  // }

  abbreviateNumber(num: number): string {
    return num + '';
  }
}
