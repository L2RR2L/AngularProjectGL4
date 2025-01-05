import { Component, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { combineLatest, Observable, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { isOpen } from '../../../store/upload/upload.selector';
import { setOpen } from '../../../store/upload/upload.actions';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { SignInButtonComponent } from './sign-in-button/sign-in-button.component';
import { AuthService } from '../../../services/auth/auth.service';
import { UploadModalComponent } from './upload-modal/upload-modal.component';

@Component({
  selector: 'app-end-nav',
  standalone: true,
  imports: [AsyncPipe, UploadModalComponent, SignInButtonComponent, UserMenuComponent],
  templateUrl: './end-nav.component.html',
  styleUrl: './end-nav.component.css'
})
export class EndNavComponent {
  isDropDownOpen: WritableSignal<boolean> = signal(false);

  isUploadModalOpen$: Observable<boolean>;

  authService = inject(AuthService);
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isUploadModalOpen$ = this.store.select(isOpen);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  toggleDropDown() {
    this.isDropDownOpen.set(!this.isDropDownOpen());
  }

  toggleUploadModal() {
    combineLatest([
      this.isUploadModalOpen$,
      this.isAuthenticated$
    ]).pipe(
      take(1),
      tap(([isUploadModalOpen, isAuthenticated]) => {
        if (isAuthenticated) {
          this.store.dispatch(setOpen({ isOpen: !isUploadModalOpen }));
        } else {
          this.authService.login();
        }
      })
    ).subscribe();
  }

  @HostListener('document:click', ['$event'])
  closeDropDownOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isDropDownOpen.set(false);
    }
  }
}
