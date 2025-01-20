import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-middle-nav',
  standalone: true,
  imports: [],
  templateUrl: './middle-nav.component.html',
  styleUrl: './middle-nav.component.css',
})
export class MiddleNavComponent {
  searchValue: WritableSignal<string> = signal('');

  constructor() {}

  handleSearch(): void {
    const query = this.searchValue();
    if (query) {
      console.log(`Searching for ${query}`);
    }
  }

  handleSearchChange(value: string): void {
    this.searchValue.set(value);
  }
}
