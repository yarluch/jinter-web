import {
  AfterViewInit,
  Component, HostBinding,
  HostListener,
  Input
} from '@angular/core';
import {SliderItemSize} from "../enums/SliderItemSize";


declare let $: any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit {
  static lastSliderIndex = -1;
  sliderIndex: number

  @Input('item-size')
  itemSize = SliderItemSize.SMALL;

  @Input('arrows')
  arrows = false;

  @Input('autoplay')
  autoplay = false;

  @Input('infinite')
  isInfinite = false;

  @HostBinding('class') class: string = '';

  isMouseDown = false;

  constructor() {
    this.sliderIndex = ++SliderComponent.lastSliderIndex
  }

  ngAfterViewInit(): void {
    $('#slider-' + this.sliderIndex).slick({
      infinite: this.isInfinite,
      slidesToShow: this.getItemsAmountToShow(),
      slidesToScroll: this.getItemsAmountToShow(),
      arrows: this.arrows,
      autoplay: this.autoplay,
      autoplaySpeed: 3000,
      pauseOnHover: true,
    });
  }

  private getItemsAmountToShow(): number {
    switch (this.itemSize) {
      case SliderItemSize.SMALL:
        return 6
      case SliderItemSize.MEDIUM:
        return 5
      case SliderItemSize.MEDIUM_2:
        return 4
      case SliderItemSize.BIG:
        return 3
      case SliderItemSize.VERY_BIG:
        return 2
      default:
        return 1
    }
  }

  @HostListener('document:mousedown', ['$event']) onDown(event: PointerEvent): void {
    this.isMouseDown = true
  }

  @HostListener('document:mousemove', ['$event']) onMove(event: PointerEvent): void {
    this.class = this.isMouseDown ? 'blocked-links' : '';
  }

  @HostListener('document:mouseup') onDragEnd(): void {
    this.isMouseDown = false
  }
}
