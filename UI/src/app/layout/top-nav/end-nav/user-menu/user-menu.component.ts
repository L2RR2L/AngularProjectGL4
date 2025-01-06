import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentChannel } from '../../../../store/auth/auth.selectors';
import { logout } from '../../../../store/auth/auth.actions';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Channel } from '../../../../types/channel';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
  channel$: Observable<Channel | null>;

  constructor(private store: Store) {
    this.channel$ = this.store.select(selectCurrentChannel);
  }

  logout() {
    this.store.dispatch(logout());
  }
}
