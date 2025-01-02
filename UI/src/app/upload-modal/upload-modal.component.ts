import { Component, input, output, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { filename } from '../store/upload/upload.selector';
import { VideoDropzoneComponent } from "../video-dropzone/video-dropzone.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [VideoDropzoneComponent, AsyncPipe],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.css'
})
export class UploadModalComponent {
  uploadModalToggleEvent = output();

  uploadFilename$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.uploadFilename$ = this.store.select(filename);
  }

  toggleUploadModal() {
    this.uploadModalToggleEvent.emit();
  }

  closeModelOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('fixed')) {
      this.toggleUploadModal();
    }
  }
}
