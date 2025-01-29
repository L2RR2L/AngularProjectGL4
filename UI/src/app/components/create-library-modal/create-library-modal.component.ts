import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-library-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-library-modal.component.html',
  styleUrl: './create-library-modal.component.css',
})
export class CreateLibraryModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<string>();

  libraryName = '';

  onSubmit() {
    if (this.libraryName.trim()) {
      this.create.emit(this.libraryName);
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }
}
