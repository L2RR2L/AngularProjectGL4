import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appClickVideosNavigate]',
  standalone: true,
})
export class ClickVideosNavigateDirective {
  constructor(private router: Router) {}

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const id = target.getAttribute('data-video-id');
    if (id) {
      this.router.navigate(['/watch'], { queryParams: { v: id } });
    }
    e.stopPropagation();
  }
}
