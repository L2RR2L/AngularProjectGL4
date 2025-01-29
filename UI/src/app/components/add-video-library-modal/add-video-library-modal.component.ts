import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Library } from '../../types/library';
import { LibraryService } from '../../services/side-nav-options/library/library.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-video-library-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-video-library-modal.component.html',
  styleUrl: './add-video-library-modal.component.css',
})
export class AddVideoLibraryModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<string>();
  constructor(private LibraryService: LibraryService) {}
  libraryList: Library[] = [];
  selectedLibraryId: string = '';
  ngOnInit(): void {
    this.LibraryService.getLibraries().subscribe((libraries) => {
      this.libraryList = libraries;
    });
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.selectedLibraryId) {
      this.create.emit(this.selectedLibraryId);
      this.closeModal();
    }
  }
}
