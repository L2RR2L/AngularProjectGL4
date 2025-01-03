import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { isLoading } from '../store/upload/upload.selector';
import { setLoading, setThumbnails, setVideoFile } from '../store/upload/upload.actions';
import { AsyncPipe } from '@angular/common';
import axios from 'axios';

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

  api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000",
  });

  constructor(private store: Store<AppState>) {
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

  async uploadFile(file: File) {
    this.store.dispatch(setLoading({ isLoading: true }));
    try {
      const formData = new FormData();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      formData.append("file", file);

      const response = await this.api.post<{ filename: string }>("/api/videos", formData, config);
      const fileName = response.data.filename;

      this.store.dispatch(setVideoFile({ filename: fileName }));

      const thumbnails = await this.api.post<string[]>("/api/videos/thumbnails", {
        filename: fileName,
      });

      this.store.dispatch(setThumbnails({ thumbnails: thumbnails.data }));
    }
    catch (e) {
      this.store.dispatch(setVideoFile({ filename: null }));
      this.store.dispatch(setThumbnails({ thumbnails: null }));
    }
    finally {
      this.store.dispatch(setLoading({ isLoading: false }));
    }
  }
}
