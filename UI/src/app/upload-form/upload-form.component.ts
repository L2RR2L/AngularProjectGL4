import { Component, signal, ViewChild, WritableSignal } from '@angular/core';
import { DetailsFormComponent } from "./details-form/details-form.component";
import { ImagePickerComponent } from "./image-picker/image-picker.component";
import { NgClass } from '@angular/common';
import { VisibilityFormComponent } from "./visibility-form/visibility-form.component";
import { initialUploadState, UploadState } from '../store/upload/upload.state';
import { forkJoin, map, mergeMap, Observable, take, tap } from 'rxjs';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { details, filename, thumbnail, visibility } from '../store/upload/upload.selector';

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
  uploadState: UploadState = initialUploadState;

  constructor(private store: Store<AppState>) { }

  onNext() {
    if (!this.currentStep()) {
      const isValidDetailsForm = this.detailsForm.onSubmit();
      const isValidImagePicker = this.imagePicker.onSubmit();
      this.currentStep.set(isValidDetailsForm && isValidImagePicker ? 1 : 0);
    } else {
      const isValidVisibilityForm = this.visibilityForm.onSubmit();
      if (!isValidVisibilityForm) {
        return;
      }

      this.currentStep.set(0);

      // Combine all the selectors
      forkJoin({
        details: this.store.select(details).pipe(
          take(1),
          map(details => ({ details }))
        ),
        thumbnail: this.store.select(thumbnail).pipe(
          take(1),
          map(thumbnail => ({ thumbnail }))
        ),
        visibility: this.store.select(visibility).pipe(
          take(1),
          map(visibility => ({ visibility }))
        ),
        filename: this.store.select(filename).pipe(
          take(1),
          map(filename => ({ filename }))
        )
      })
        .pipe(
          tap(results => {
            // Update the upload state with the results
            this.uploadState = {
              ...this.uploadState,
              ...results.details,
              ...results.thumbnail,
              ...results.visibility,
              ...results.filename
            };
          }),
          mergeMap(() => {
            console.log('Uploading with state:', this.uploadState);

            // Simulate a file upload or perform the actual upload logic here
            // return this.uploadService.uploadFile(this.uploadState); // Replace with your upload service logic
            return [];
          })
        )
        .subscribe({
          next: response => {
            console.log('Upload response:', response);
          },
          error: err => {
            console.error('Error during upload:', err);
          },
          complete: () => {
            console.log('Upload process complete.');
          }
        });
    }
  }


  onBack() {
    if (this.currentStep()) {
      this.currentStep.set(0);
    }
  }
}
