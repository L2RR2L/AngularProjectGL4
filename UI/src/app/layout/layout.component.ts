import { Component } from '@angular/core';
import { TopNavComponent } from './top-nav/top-nav.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopNavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
