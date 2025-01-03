import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadAuthState, loginSuccess } from './auth.actions';
import { map, mergeMap, catchError } from 'rxjs/operators'; // Added catchError import
import { environment } from '../../../environments/environment.development';
import { Channel } from '../../types/channel';
import { EMPTY } from 'rxjs';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  http = inject(HttpClient);

  constructor() {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAuthState),
      mergeMap(() => {
        console.log('Effect triggered, making request...');
        return this.http
          .get<Channel>(`${environment.apiURL}/api/channels/owner`, {
            withCredentials: true,
          })
          .pipe(
            map((channel) => loginSuccess({ channel })),
            catchError((error) => {
              console.error(error);
              return EMPTY;
            })
          );
      })
    )
  );
}
