import { Component, OnInit, Signal, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleDrawer } from '../../store/layout/layout.actions';
import { AppState } from '../../store/app.state';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  isDrawerOpen$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isDrawerOpen$ = this.store.select(
      (state) => state.layout.isDrawerOpen
    );
  }
}
