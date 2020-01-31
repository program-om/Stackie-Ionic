import { Directive, Input, HostListener, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {
  @Input() header: HTMLElement;
  headerHeight;
  scrollContent;
  @Input() componentEle: HTMLElement;

  constructor(private element: ElementRef,
              // tslint:disable-next-line: deprecation
              private renderer: Renderer) { }

  ngOnInit() {
    this.headerHeight = this.header.clientHeight;
    this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 700ms');
    this.scrollContent = this.componentEle; // this.element.nativeElement.getElementsByClassName('scroll-content')[0];
    console.log(this.scrollContent);
    this.renderer.setElementStyle(this.scrollContent, 'webkitTransition', 'margin-top 700ms');
  }

  @HostListener('ionScroll', ['$event'])onContentScroll(event) {
    if (event.detail.scrollTop > 56) {
      this.renderer.setElementStyle(this.header, 'top', '-56px');
      this.renderer.setElementStyle(this.scrollContent, 'top', '-50px');
    } else {
      this.renderer.setElementStyle(this.header, 'top', '0px');
      this.renderer.setElementStyle(this.scrollContent, 'top', '0px');
    }

    // I want the header to show up if the user scrolling up
    // if (event.directionY === 'down' && event.deltaY > 112) {
    //   this.renderer.setElementStyle(this.header, 'top', `-${this.headerHeight}px`);
    //   this.renderer.setElementStyle(this.scrollContent, 'margin-top', '-50px');
    // } else if (event.directionY === 'up' && event.deltaY < -6) {
    //   this.renderer.setElementStyle(this.header, 'top', '0px');
    //   this.renderer.setElementStyle(this.scrollContent, 'margin-top', `0px`);
    // }
  }

}
