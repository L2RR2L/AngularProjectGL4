import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../../../../store/app.state';
import { setLoading, setVideoFile, setThumbnails } from '../../../../../store/upload/upload.actions';
import { isLoading } from '../../../../../store/upload/upload.selector';
import { Thumbnail } from '../../../../../types/thumbnail';
import { API } from '../../../../../api';
import { FileService } from '../../../../../services/file/file.service';

@Component({
  selector: 'app-video-dropzone',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './video-dropzone.component.html',
  styleUrl: './video-dropzone.component.css'
})
export class VideoDropzoneComponent {
  dragAccepted: WritableSignal<boolean> = signal(false);
  dragRejected: WritableSignal<boolean> = signal(false);

  isLoading$: Observable<boolean>;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private store: Store<AppState>, private http: HttpClient, private fileService: FileService) {
    this.isLoading$ = this.store.select(isLoading);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragAccepted.set(event.dataTransfer?.types.includes('Files') || false);
    this.dragRejected.set(!this.dragAccepted());
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragAccepted.set(false);
    this.dragRejected.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragAccepted.set(false);
    this.dragRejected.set(false);

    const file = event.dataTransfer?.files[0];
    if (file && this.validateFile(file)) {
      this.uploadFile(file);
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file && this.validateFile(file)) {
      this.uploadFile(file);
    }
  }

  validateFile(file: File): boolean {
    return this.fileService.validateFile(file);
  }

  uploadFile(file: File) {
    return this.fileService.uploadFile(file).pipe(
      tap(() => this.store.dispatch(setLoading({ isLoading: true }))),
      // Extract filename from response
      map(response => response.filename),
      // Store video file info
      tap(filename => this.store.dispatch(setVideoFile({ filename }))),
      // Call thumbnails request
      switchMap(filename => this.fileService.getThumbnails(filename)),
      // Store thumbnails
      tap(response => this.store.dispatch(setThumbnails({ thumbnails: response.thumbnails }))),
      // Error handling
      catchError(() => {
        this.store.dispatch(setVideoFile({ filename: null }));
        this.store.dispatch(setThumbnails({ thumbnails: null }));
        return EMPTY;
      }),
      // Finalize workflow
      finalize(() => {
        this.store.dispatch(setLoading({ isLoading: false }));
      })
    ).subscribe();
  }
}
