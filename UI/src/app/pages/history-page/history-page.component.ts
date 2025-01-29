import { Component, OnInit } from '@angular/core';
import {
  HistoryService,
  HistoryState,
} from '../../services/side-nav-options/history/history.service';
import { Store } from '@ngrx/store';
import { Observable, switchMap, of } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import { SignInButtonComponent } from '../../layout/top-nav/end-nav/sign-in-button/sign-in-button.component';
import { AsyncPipe } from '@angular/common';
import { History } from '../../types/history';
import { RouterModule } from '@angular/router';
import { ListVideosSummaryComponent } from './list-videos-summary/list-videos-summary.component';

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [
    SignInButtonComponent,
    AsyncPipe,
    ListVideosSummaryComponent,
    RouterModule,
  ],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css',
})
export class HistoryPageComponent implements OnInit {
  state$: Observable<HistoryState>;

  myHistory: History[] | undefined;

  constructor(
    private store: Store<AppState>,
    private historyService: HistoryService
  ) {
    this.state$ = this.store.select(selectIsAuthenticated).pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return of({
            type: 'authenticated' as const,
          });
        } else {
          return of({
            type: 'notAuthenticated' as const,
            option: this.historyService.getSideNavOption(),
          });
        }
      })
    );
  }

  ngOnInit() {
    this.store.select(selectIsAuthenticated).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.historyService.getMyHistory().subscribe((history) => {
          this.myHistory = history;
        });
      }
    });
  }
}
