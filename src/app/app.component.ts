import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageDataService} from "./services/local-storage-data.service";
import {SliderItemSize} from "./enums/SliderItemSize";

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jinter';

  popularInterests: Array<any> = [];
  constructor(private translateService: TranslateService, public storageService: LocalStorageDataService) {
    this.popularInterests.push({
      id: '',
      name: 'Genshin Impact',
      description: 'Genshin Impact — відеогра жанру Action/RPG з відкритим світом, розроблена китайською компанією miHoYo Limited. Гра розповсюджується цифровою дистрибуцією за моделлю free-to-play. Основа «Genshin Impact» — це «ґача-гра», система колекціонування та розвитку персонажів, які випадають з різною ймовірністю.',
      mainPhotoUrl: 'https://assets-prd.ignimgs.com/2020/09/29/genshin-impact-button-fin-1601346152039.jpg'
    })
    this.popularInterests.push({
      id: '',
      name: 'Honkai Star Rail',
      description: 'Genshin Impact — відеогра жанру Action/RPG з відкритим світом, розроблена китайською компанією miHoYo Limited. Гра розповсюджується цифровою дистрибуцією за моделлю free-to-play. Основа «Genshin Impact» — це «ґача-гра», система колекціонування та розвитку персонажів, які випадають з різною ймовірністю.',
      mainPhotoUrl: 'https://ixbt.online/live/images/original/16/95/46/2023/05/01/d8dfb2dc7d.jpg'
    })
  }

  ngOnInit(): void {
    this.translateService.use(this.storageService.getCurrentLocale());

    /*---------------------------------------*/


  }


  protected readonly SliderSizeSmall = SliderItemSize.SMALL;

}
