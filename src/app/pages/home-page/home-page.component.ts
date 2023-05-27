import {Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {SliderItemSize} from "../../enums/SliderItemSize";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {LocalStorageDataService} from "../../services/local-storage-data.service";
import {Interest} from "../../types/types";
import {Location} from "@angular/common";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  popularInterests: Array<any> = [];

  protected readonly SliderSizeSmall = SliderItemSize.SMALL;
  protected readonly SliderSizeMedium = SliderItemSize.MEDIUM;
  protected readonly SliderSizeBig = SliderItemSize.BIG;

  @HostBinding('class') class!: string;
  private isPopstate: Boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private storageService: LocalStorageDataService) {
    this.class = "main-content-wrapper"


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
    this.route.params.subscribe(params => {
      this.setRedirection(params)
    })
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    this.isPopstate = true;
  }

  setRedirection(params: Params) {
    if (!params.hasOwnProperty('interest-type') || !<Interest>params['interest-type']) {
      this.location.replaceState(`/${this.storageService.getCurrentInterest()}`);
      return;
    }
    if (<Interest>params['interest-type'] != this.storageService.getCurrentInterest()) {
      this.storageService.saveCurrentInterest(<Interest>params['interest-type']);
    }

    this.storageService.getCurrentInterestObserver().subscribe(interest => {
      if (<Interest>params['interest-type'] != this.storageService.getCurrentInterest()
          && !this.isPopstate) {
        this.router.navigate([`/${interest}`])
      }
    })
  }
}
