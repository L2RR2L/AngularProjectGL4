import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { SignInButtonComponent } from './sign-in-button/sign-in-button.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  selector: 'app-end-nav',
  standalone: true,
  imports: [AsyncPipe, SignInButtonComponent, UserMenuComponent],
  templateUrl: './end-nav.component.html',
  styleUrl: './end-nav.component.css',
})
export class EndNavComponent {
  store = inject(Store);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
}
