import { Component } from '@angular/core';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopNavComponent, SideNavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
