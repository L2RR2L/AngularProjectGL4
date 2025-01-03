import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { Channel } from '../../../types/channel';
import { Store } from '@ngrx/store';
import { selectCurrentChannel } from '../../../store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { loadAuthState, logout } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-end-nav',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './end-nav.component.html',
  styleUrl: './end-nav.component.css',
})
export class EndNavComponent {
  store = inject(Store);

  channel$ = this.store.select(selectCurrentChannel);

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.store.dispatch(logout());
  }
}
