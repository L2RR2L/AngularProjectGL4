import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentChannel } from '../../../../store/auth/auth.selectors';
import { logout } from '../../../../store/auth/auth.actions';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Channel } from '../../../../types/channel';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
  channel$: Observable<Channel | null>;

  constructor(private store: Store, private auth: AuthService) {
    this.channel$ = this.store.select(selectCurrentChannel);
  }

  logout() {
    this.auth.logout();
  }
}
