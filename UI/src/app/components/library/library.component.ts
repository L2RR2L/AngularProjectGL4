import { Component, Input } from '@angular/core';
import { Library } from '../../types/library';
import { DateFormatterPipe } from '../../pipe/date-formatter.pipe';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    DateFormatterPipe
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css',
})
export class LibraryComponent {
  @Input() library!: Library;
}
