import { Component, Input } from '@angular/core';
import { Library } from '../../types/library';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  @Input() library!: Library;
}
