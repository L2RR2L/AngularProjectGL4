import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Store } from '@ngrx/store';
import { loadAuthState } from './store/auth/auth.actions';
import { selectIsLoaded } from './store/auth/auth.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { initFlowbite } from 'flowbite';
import { SubscriptionComponent } from "./components/subscription/subscription.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LayoutComponent,
    AsyncPipe,
    CommonModule,
    SpinnerComponent,
    SubscriptionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  store = inject(Store);
  isloaded$ = this.store.select(selectIsLoaded);

  ngOnInit(): void {
    initFlowbite();
    this.store.dispatch(loadAuthState());
  }
}
