import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { TitleCasePipe } from '@angular/common';
import { setVisibility } from '../../store/upload/upload.actions';

@Component({
  selector: 'app-visibility-form',
  standalone: true,
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './visibility-form.component.html',
  styleUrl: './visibility-form.component.css'
})
export class VisibilityFormComponent {
  visibilityForm: FormGroup;
  selectedThumbnail: string | null = null;
  visibility = ["public", "unlisted", "private"];

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.visibilityForm = this.fb.group({
      visibility: ['', [Validators.required]]
    });
  }

  selectVisibility(visibility: string) {
    this.visibilityForm.patchValue({ visibility: visibility });
  }

  onSubmit() {
    Object.keys(this.visibilityForm.controls).forEach(key => {
      const control = this.visibilityForm.get(key);
      control?.markAsTouched();
    });
    if (this.visibilityForm.valid) {
      this.store.dispatch(setVisibility({ visibility: this.visibility.indexOf(this.visibilityForm.value.visibility) }));
    }
    return this.visibilityForm.valid;
  }
}
