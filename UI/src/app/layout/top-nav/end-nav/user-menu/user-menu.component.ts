import { afterNextRender, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentChannel } from '../../../../store/auth/auth.selectors';
import { logout } from '../../../../store/auth/auth.actions';
import { AsyncPipe } from '@angular/common';
import { FlowbiteService } from '../../../../services/flow-bite/flow-bite.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
  store = inject(Store);
  channel$ = this.store.select(selectCurrentChannel);

  logout() {
    this.store.dispatch(logout());
  }
}
