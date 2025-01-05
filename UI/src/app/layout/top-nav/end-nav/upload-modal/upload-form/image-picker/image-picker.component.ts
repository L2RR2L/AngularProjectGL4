import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { AppState } from "../../../../../../store/app.state";
import { setThumbnail } from "../../../../../../store/upload/upload.actions";
import { thumbnails } from "../../../../../../store/upload/upload.selector";
import { Thumbnail } from "../../../../../../types/thumbnail";
@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './image-picker.component.html',
})
export class ImagePickerComponent {
  thumbnails$: Observable<Array<Thumbnail> | null>;

  thumbnailForm: FormGroup;

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
      this.store.dispatch(setThumbnail({ thumbnailFileName }));
    }
    return this.thumbnailForm.valid;
  }
}