import {
  Component,
  computed,
  effect,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  Signal,
} from '@angular/core';
import { OnHoverClassDirective } from '../../directives/hover/on-hover-class.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCurrentChannel } from '../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Channel } from '../../types/channel';

import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';
import { toast } from 'ngx-sonner';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-subscribe-btn',
  standalone: true,
  imports: [OnHoverClassDirective],
  templateUrl: './subscribe-btn.component.html',
  styleUrl: './subscribe-btn.component.css',
})
export class SubscribeBtnComponent implements OnChanges {
  channelId = input<string>('');
  currentChannel: Signal<Channel | undefined | null>;
  toast = toast;
  isSubscribed = signal<boolean>(false);
  disable = signal<boolean>(false);
  subscriptionChange = output<boolean>();
  constructor(
    private subscriptionsService: SubscriptionsService,
    private store: Store<AppState>
  ) {
    this.currentChannel = toSignal(this.store.select(selectCurrentChannel));
    effect(() => {
      console.log('Is subscribed', this.isSubscribed());
    });
  }

  ngOnChanges(): void {
    if (this.channelId() && this.currentChannel()) {
      this.subscriptionsService
        .getSubscriptions(this.channelId())
        .then((res) => {
          this.isSubscribed.set(res);
        });
    }
  }

  async handleClicked() {
    console.log('DEBUG: handleClicked called');

    if (!this.currentChannel()) {
      this.toast.info('You need to be logged in to subscribe');
    } else {
      this.disable.set(true);
      const data = {
        channel: this.channelId(),
        subscriber: this.currentChannel()!.id,
      };

      if (this.isSubscribed()) {
        await this.subscriptionsService.deleteSubscription(data.channel);
        this.isSubscribed.set(false);
        this.subscriptionChange.emit(true);
      } else {
        await this.subscriptionsService.addSubscriptions(
          data.channel,
          data.subscriber
        );
        this.isSubscribed.set(true);
        this.subscriptionChange.emit(true);
      }
      this.disable.set(false);
    }
  }
}
