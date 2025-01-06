import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleDrawer } from '../../../store/layout/layout.actions';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-start-nav',
  standalone: true,
  imports: [],
  templateUrl: './start-nav.component.html',
  styleUrl: './start-nav.component.css',
})
export class StartNavComponent {
  constructor(private store: Store<AppState>) { }

  toggleDrawer() {
    this.store.dispatch(toggleDrawer());
  }
}
