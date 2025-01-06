import { Component } from '@angular/core';
import { LibraryService, LibraryState } from '../../services/side-nav-options/library/library.service';
import { Store } from '@ngrx/store';
import { Observable, switchMap, map, startWith, catchError, of } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import { SignInButtonComponent } from "../../layout/top-nav/end-nav/sign-in-button/sign-in-button.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-library-page',
  standalone: true,
  imports: [SignInButtonComponent, AsyncPipe],
  templateUrl: './library-page.component.html',
  styleUrl: './library-page.component.css'
})
export class LibraryPageComponent {
  state$: Observable<LibraryState>;

  constructor(private store: Store<AppState>, private libraryService: LibraryService) {
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
            option: this.libraryService.getSideNavOption()
          });
        }
      })
    );
  }
}
