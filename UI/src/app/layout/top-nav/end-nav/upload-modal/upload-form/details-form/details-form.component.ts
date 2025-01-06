import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoryService } from '../../../../../../services/category/category.service';
import { AppState } from '../../../../../../store/app.state';
import { setDetails } from '../../../../../../store/upload/upload.actions';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css'],
  imports: [ReactiveFormsModule, TitleCasePipe],
  standalone: true
})
export class DetailsFormComponent {
  detailsForm!: FormGroup;
  categories: string[];

  constructor(private store: Store<AppState>, private fb: FormBuilder, private categoryService: CategoryService) {
    this.detailsForm = this.fb.group({
      title: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true
      }),
      description: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(100)],
        nonNullable: true
      }),
      category: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true
      })
    });
    this.categories = this.categoryService.getCategories();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.detailsForm.patchValue({ thumbnail: file });
    }
  }

  onSubmit(): boolean {
    // Mark all fields as touched to trigger validation display
    Object.keys(this.detailsForm.controls).forEach(key => {
      const control = this.detailsForm.get(key);
      control?.markAsTouched();
    });

    if (this.detailsForm.valid) {
      const title = this.detailsForm.get('title')?.value;
      const description = this.detailsForm.get('description')?.value;
      const category = this.categoryService.getCategoryIndex(this.detailsForm.get('category')?.value);
      this.store.dispatch(setDetails({ details: { title, description, category } }));
    }
    return this.detailsForm.valid;
  }
}
