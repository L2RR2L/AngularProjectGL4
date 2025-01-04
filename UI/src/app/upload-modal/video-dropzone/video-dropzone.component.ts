import { Component, ElementRef, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { AppState } from '../../store/app.state';
import { isLoading, thumbnails } from '../../store/upload/upload.selector';
import { setLoading, setThumbnails, setVideoFile } from '../../store/upload/upload.actions';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Thumbnail } from '../../types/thumbnail';

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

  constructor(private store: Store<AppState>, private http: HttpClient) {
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
    return file.type === 'video/mp4' && file.size <= 25 * 1024 * 1024;
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ filename: string }>('/api/videos', formData).pipe(
      tap(() => this.store.dispatch(setLoading({ isLoading: true }))),
      // Extract filename from response
      map(response => response.filename),
      // Store video file info
      tap(filename => this.store.dispatch(setVideoFile({ filename }))),
      // Call thumbnails request
      switchMap(filename =>
        this.http.post<{ thumbnails: Thumbnail[] }>(
          '/api/videos/thumbnails',
          { filename }
        )
      ),
      // Store thumbnails
      tap(response => {
        this.store.dispatch(setThumbnails({ thumbnails: response.thumbnails }));
      }),
      // Error handling
      catchError(error => {
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
