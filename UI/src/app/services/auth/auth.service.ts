import { inject, Injectable } from '@angular/core';
import { API } from '../../api';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  store = inject(Store);

  constructor() {}

  login(): void {
    window.location.assign(API.Login());
  }

  logout(): void {
    this.http.get(API.Logout()).subscribe();
    this.store.dispatch(logout());
  }
}
