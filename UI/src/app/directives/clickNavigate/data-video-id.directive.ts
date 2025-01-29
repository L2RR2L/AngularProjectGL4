import { Directive, ElementRef, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDataVideoId]',
  standalone: true,
})
export class DataVideoIdDirective {
  appDataVideoId = input.required<string>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.appDataVideoId) {
      // Set the data-video-id attribute for the host element
      this.renderer.setAttribute(
        this.el.nativeElement,
        'data-video-id',
        this.appDataVideoId()
      );

      // Apply the data-video-id attribute to all child input elements
      this.applyToChildren(this.el.nativeElement, this.appDataVideoId());
    }
  }

  private applyToChildren(element: HTMLElement, videoId: string) {
    // Loop through all the child elements and set 'data-video-id' on 'input' elements
    Array.from(element.children).forEach((child: any) => {
      this.renderer.setAttribute(child, 'data-video-id', videoId);
      this.applyToChildren(child, videoId);
    });
  }
}
