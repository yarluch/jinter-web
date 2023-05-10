import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
import {SliderItemSize} from "../enums/SliderItemSize";
import {InterestCardData} from "../interfaces/InterestCardData";
import {InterestCardComponent} from "../interest-card/interest-card.component";

declare let $: any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input('item-size')
  itemSize = SliderItemSize.SMALL

  constructor() { }

  ngOnInit(): void {
    $('.slider').slick({
      infinite: false,
      slidesToShow: this.getItemsAmountToShow(),
      slidesToScroll: this.getItemsAmountToShow()
    });
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
}
