import { Component } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { toggleDrawer } from '../../store/layout/layout.actions';
import { AsyncPipe } from '@angular/common';
import { StartNavComponent } from './start-nav/start-nav.component';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [AsyncPipe, StartNavComponent],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css',
})
export class TopNavComponent {
  isDrawerOpen$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isDrawerOpen$ = this.store.select(
      (state) => state.layout.isDrawerOpen
    );
  }
  onToggleDrawer() {
    this.store.dispatch(toggleDrawer());
  }
}
