import { Component, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { DetailsFormComponent } from "./details-form/details-form.component";
import { ImagePickerComponent } from "./image-picker/image-picker.component";
import { NgClass } from '@angular/common';
import { VisibilityFormComponent } from "./visibility-form/visibility-form.component";
import { catchError, combineLatest, EMPTY, forkJoin, map, mergeMap, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../../../../store/app.state';
import { selectCurrentChannel } from '../../../../../store/auth/auth.selectors';
import { resetUpload, setLoading } from '../../../../../store/upload/upload.actions';
import { details, thumbnail, visibility, filename } from '../../../../../store/upload/upload.selector';
import { UploadState, initialUploadState } from '../../../../../store/upload/upload.state';
import { API } from '../../../../../api';
import { UploadService } from '../../../../../services/upload/upload.service';

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [DetailsFormComponent, ImagePickerComponent, NgClass, VisibilityFormComponent],
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css'
})
export class UploadFormComponent {
  @ViewChild("detailsForm") detailsForm!: DetailsFormComponent;
  @ViewChild("imagePicker") imagePicker!: ImagePickerComponent;
  @ViewChild("visibilityForm") visibilityForm!: VisibilityFormComponent;

  currentStep: WritableSignal<number> = signal(0);

  http = inject(HttpClient);
  uplaodService = inject(UploadService);
  store = inject(Store<AppState>);
  uploadState: UploadState = initialUploadState;

  onNext() {
    if (!this.currentStep()) {
      this.handleFirstStep()
    }
    else {
      this.handleSecondStep();
    }
  }


  onBack() {
    if (this.currentStep()) {
      this.currentStep.set(0);
    }
    else {
      this.store.dispatch(resetUpload());
    }
  }

  private handleFirstStep() {
    const isValidDetailsForm = this.detailsForm.onSubmit();
    const isValidImagePicker = this.imagePicker.onSubmit();

    if (isValidDetailsForm && isValidImagePicker) {
      this.currentStep.set(1);
    }
  }

  private handleSecondStep() {
    if (!this.visibilityForm.onSubmit()) {
      return;
    }

    // Collect required data from store
    const uploadData$ = combineLatest({
      details: this.store.select(details),
      thumbnailFileName: this.store.select(thumbnail),
      visibility: this.store.select(visibility),
      filename: this.store.select(filename),
      uploader: this.store.select(selectCurrentChannel).pipe(
        map(channel => channel?.id ?? null)
      )
    }).pipe(
      take(1),
      map(data => ({
        details: data.details,
        thumbnailFileName: data.thumbnailFileName,
        visibility: data.visibility,
        filename: data.filename,
        uploader: data.uploader
      }))
    );

    // Handle the upload process
    uploadData$.pipe(
      tap(() => {
        this.store.dispatch(setLoading({ isLoading: true }));
      }),
      switchMap(state =>
        this.uplaodService.postUploadVideo(state).pipe(
          tap(() => {
            this.store.dispatch(resetUpload());
            this.currentStep.set(0);
          }),
          catchError(error => {
            console.error('Upload failed:', error);
            return EMPTY;
          })
        )
      )
    ).subscribe({
      complete: () => console.log('Upload process completed successfully')
    });
  }
}
