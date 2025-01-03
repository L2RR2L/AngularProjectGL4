import { Component, HostListener, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable, take } from 'rxjs';
import { isAuthenticated } from '../../../store/channel/channel.selector';
import { AsyncPipe } from '@angular/common';
import { UploadModalComponent } from "../../../upload-modal/upload-modal.component";
import { isOpen } from '../../../store/upload/upload.selector';
import { setOpen } from '../../../store/upload/upload.actions';

@Component({
  selector: 'app-end-nav',
  standalone: true,
  imports: [AsyncPipe, UploadModalComponent],
  templateUrl: './end-nav.component.html',
  styleUrl: './end-nav.component.css'
})
export class EndNavComponent {
  isAuth$: Observable<boolean>;
  isUploadModalOpen$: Observable<boolean>;
  isDropDownOpen: WritableSignal<boolean> = signal(false);

  constructor(private store: Store<AppState>) {
    this.isAuth$ = this.store.select(isAuthenticated);
    this.isUploadModalOpen$ = this.store.select(isOpen);
  }

  toggleDropDown() {
    this.isDropDownOpen.set(!this.isDropDownOpen());
  }

  toggleUploadModal() {
    this.isUploadModalOpen$.pipe(
      take(1)
    ).subscribe(currentValue => {
      this.store.dispatch(setOpen({ isOpen: !currentValue }));
    });
  }

  @HostListener('document:click', ['$event'])
  closeDropDownOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isDropDownOpen.set(false);
    }
  }
}
