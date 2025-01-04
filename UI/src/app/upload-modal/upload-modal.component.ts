import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take, tap } from 'rxjs';
import { AppState } from '../store/app.state';
import { filename, isOpen } from '../store/upload/upload.selector';
import { VideoDropzoneComponent } from "./video-dropzone/video-dropzone.component";
import { AsyncPipe } from '@angular/common';
import { setOpen } from '../store/upload/upload.actions';
import { UploadFormComponent } from "./upload-form/upload-form.component";

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [VideoDropzoneComponent, AsyncPipe, UploadFormComponent],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.css'
})
export class UploadModalComponent {
  isUploadModalOpen$: Observable<boolean>;
  uploadFilename$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.uploadFilename$ = this.store.select(filename);
    this.isUploadModalOpen$ = this.store.select(isOpen);
  }

  toggleUploadModal() {
    this.isUploadModalOpen$.pipe(
      take(1),
      tap((isUploadModalOpen => {
        this.store.dispatch(setOpen({ isOpen: !isUploadModalOpen }));
      }))
    ).subscribe();
  }

  closeModelOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('fixed')) {
      this.toggleUploadModal();
    }
  }
}
