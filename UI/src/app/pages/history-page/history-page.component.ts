import { Component } from '@angular/core';
import { HistoryService, HistoryState } from '../../services/side-nav-options/history/history.service';
import { Store } from '@ngrx/store';
import { Observable, switchMap, of } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import { SignInButtonComponent } from "../../layout/top-nav/end-nav/sign-in-button/sign-in-button.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [SignInButtonComponent, AsyncPipe],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {
  state$: Observable<HistoryState>;

  constructor(private store: Store<AppState>, private historyService: HistoryService) {
    this.state$ = this.store.select(selectIsAuthenticated).pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          // add needed logic for the added fields for authenticated library state
          return of({
            type: 'authenticated' as const,
          })
        } else {
          return of({
            type: 'notAuthenticated' as const,
            option: this.historyService.getSideNavOption()
          });
        }
      })
    );
  }
}
