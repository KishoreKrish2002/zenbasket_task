import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProductStyle]'
})
export class ProductStyleDirective {
  /**
   * Variable for identify hover state of a element
   */
  onHover!: boolean;
  /**
   * @param ele - service for get element details
   * @param render - used to add styles for a element
   */
  constructor(
    private ele: ElementRef,
    private render: Renderer2
  ) { }
  /**
   * Called after the component's view is fully initialized
   */
  ngOnInit(): void {
    // Listen for mousemove event to determine if the mouse is hovering over the testimonial card
    document.addEventListener('mousemove', e => {
      // Check if ele element exists and contains the mouse coordinates
      this.ele && this.ele.nativeElement &&
        this.ele.nativeElement.contains(document.elementFromPoint(e.clientX, e.clientY)) ?
        this.onHover = true : this.onHover = false;
      if (this.onHover) {
        this.render.addClass(this.ele.nativeElement, 'hover-element');
      } else {
        this.render.removeClass(this.ele.nativeElement, 'hover-element');
      }
    }, { passive: true });
  }
}
