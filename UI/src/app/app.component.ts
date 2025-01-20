import { afterNextRender, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Store } from '@ngrx/store';
import { loadAuthState } from './store/auth/auth.actions';
import { selectIsLoaded } from './store/auth/auth.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FlowbiteService } from './services/flow-bite/flow-bite.service';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent,
    AsyncPipe,
    CommonModule,
    SpinnerComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isloaded$: Observable<boolean | undefined>;

  constructor(
    private flowbiteService: FlowbiteService,
    private store: Store<AppState>
  ) {
    afterNextRender(() => {
      this.flowbiteService.loadFlowbite((flowbite) => {
        console.log('Flowbite loaded', flowbite);
      });
    });
    this.isloaded$ = this.store.select(selectIsLoaded);
  }

  ngOnInit(): void {
    this.store.dispatch(loadAuthState());
  }
}
