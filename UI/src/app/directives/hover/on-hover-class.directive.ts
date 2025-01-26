import {
  Directive,
  ElementRef,
  HostListener,
  input,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appOnHoverClass]',
  standalone: true,
})
export class OnHoverClassDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  hoverClass = input<string>('', {
    alias: 'appOnHoverClass',
  });

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, this.hoverClass());
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, this.hoverClass());
  }
}
