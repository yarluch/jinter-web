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

  @HostBinding('class') class: string = '';

  isMouseDown = false;

  constructor() {
    this.sliderIndex = ++SliderComponent.lastSliderIndex
  }

  ngAfterViewInit(): void {
    $('#slider-' + this.sliderIndex).slick({
      infinite: false,
      slidesToShow: this.getItemsAmountToShow(),
      slidesToScroll: this.getItemsAmountToShow()
    });

    /*$('.slick-slide').on('mousedown', function (evt) {
      $('.slick-slide').on('mouseup mousemove', function handler(evt) {
        if (evt.type === 'mouseup') {
          $product_id = $(this).data('product-id');
          $('#product_select_form').submit();
          $('#product_id').val($product_id);
        }
        $('.slick-slide').off('mouseup mousemove', handler);
      });
    });*/
  }

  private getItemsAmountToShow(): number {
    switch (this.itemSize) {
      case SliderItemSize.SMALL:
        return 6
      case SliderItemSize.MEDIUM:
        return 5
      case SliderItemSize.BIG:
        return 3
      case SliderItemSize.VERY_BIG:
        return 2
      default:
        return 1
    }
  }

  @HostListener('mousedown', ['$event']) onDown(event: PointerEvent): void {
    this.isMouseDown = true
  }

  @HostListener('mousemove', ['$event']) onMove(event: PointerEvent): void {
    console.error('sdfdsfsdfd')
    this.class = this.isMouseDown ? 'blocked-links' : '';
  }

  @HostListener('mouseup') onDragEnd(): void {
    this.isMouseDown = false
  }
}
