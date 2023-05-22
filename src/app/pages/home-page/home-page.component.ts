import { Component, OnInit } from '@angular/core';
import {SliderItemSize} from "../../enums/SliderItemSize";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  popularInterests: Array<any> = [];

  protected readonly SliderSizeSmall = SliderItemSize.SMALL;
  protected readonly SliderSizeBig = SliderItemSize.BIG;

  constructor() {
    this.popularInterests.push({
      id: '12-23231',
      name: 'Genshin Impact',
      description: 'Genshin Impact — відеогра жанру Action/RPG з відкритим світом, розроблена китайською компанією miHoYo Limited. Гра розповсюджується цифровою дистрибуцією за моделлю free-to-play. Основа «Genshin Impact» — це «ґача-гра», система колекціонування та розвитку персонажів, які випадають з різною ймовірністю.',
      mainPhotoUrl: 'https://assets-prd.ignimgs.com/2020/09/29/genshin-impact-button-fin-1601346152039.jpg'
    })
    this.popularInterests.push({
      id: 'cdsfd-sdfsdff',
      name: 'Honkai Star Rail',
      description: 'Genshin Impact — відеогра жанру Action/RPG з відкритим світом, розроблена китайською компанією miHoYo Limited. Гра розповсюджується цифровою дистрибуцією за моделлю free-to-play. Основа «Genshin Impact» — це «ґача-гра», система колекціонування та розвитку персонажів, які випадають з різною ймовірністю.',
      mainPhotoUrl: 'https://ixbt.online/live/images/original/16/95/46/2023/05/01/d8dfb2dc7d.jpg'
    })
  }

  ngOnInit(): void {
  }

}
