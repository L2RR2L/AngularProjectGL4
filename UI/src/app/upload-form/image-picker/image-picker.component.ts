import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { thumbnails } from '../../store/upload/upload.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { AsyncPipe } from '@angular/common';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { setThumbnail } from '../../store/upload/upload.actions';

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './image-picker.component.html',
  styleUrl: './image-picker.component.css'
})
export class ImagePickerComponent {
  thumbnails$: Observable<{ thumbnails: Array<{ filename: string, link: string }> }>;
  thumbnailForm: FormGroup;
  selectedThumbnail: string | null = null;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.thumbnails$ = this.store.select(thumbnails);
    this.thumbnailForm = this.fb.group({
      thumbnail: ['', [Validators.required]]
    });
  }

  selectThumbnail(filename: string) {
    this.thumbnailForm.patchValue({ thumbnail: filename });
  }

  onSubmit() {
    Object.keys(this.thumbnailForm.controls).forEach(key => {
      const control = this.thumbnailForm.get(key);
      control?.markAsTouched();
    });
    if (this.thumbnailForm.valid) {
      const thumbnailFileName = this.thumbnailForm.value.thumbnail;
      this.store.dispatch(setThumbnail({ thumbnailFileName: thumbnailFileName }));
    }
    return this.thumbnailForm.valid;
  }
}