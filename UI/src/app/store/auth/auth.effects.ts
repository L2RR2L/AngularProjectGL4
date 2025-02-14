import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadAuthState, loginSuccess, logout } from './auth.actions';
import { map, mergeMap, catchError } from 'rxjs/operators'; // Added catchError import
import { Channel } from '../../types/channel';
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { API } from '../../api';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  http = inject(HttpClient);
  store = inject(Store);

  constructor() {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuthState),
      mergeMap(() => {
        return this.http.get<Channel>(API.GetOwnerChannel()).pipe(
          map((channel) => {
            return loginSuccess({ channel });
          }),
          catchError(() => {
            this.store.dispatch(logout());
            return EMPTY;
          })
        );
      })
    )
  );
}
