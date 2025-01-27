import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]', // Apply this directive to an element
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  // Listen for clicks anywhere in the document
  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent): void {
    // If the click is outside of the element, emit the event
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickOutside.emit();
    }
  }
}
