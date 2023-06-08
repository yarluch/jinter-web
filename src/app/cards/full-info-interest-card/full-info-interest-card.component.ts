import {Component, Input, OnInit} from '@angular/core';
import {InterestCardData} from "../../interfaces/interest/interestCardData";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {InterestControllerService} from "../../services/interest-controller.service";
import {Locale} from "../../types/types";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'full-info-interest-card',
  templateUrl: './full-info-interest-card.component.html',
  styleUrls: ['./full-info-interest-card.component.css'],
  host:     {
    '[class.color-1]':'index % 4 == 0',
    '[class.color-2]':'index % 4 == 1',
    '[class.color-3]':'index % 4 == 2',
    '[class.color-4]':'index % 4 == 3'
  }
})
export class FullInfoInterestCardComponent implements OnInit {
  alternativePhoto: string = 'https://assets-prd.ignimgs.com/2020/09/29/genshin-impact-button-fin-1601346152039.jpg'

  @Input('interest-data')
  data: InterestCardData = {
    id: '',
    mainPhotoUrl: 'https://assets-prd.ignimgs.com/2020/09/29/genshin-impact-button-fin-1601346152039.jpg',
    averageCustomerReviewRate: 0,
    translations: []
  }

  @Input('index')
  index = 0

  title = '';
  description = '';

  @Input('interest')
  interest = ''

  constructor(private localeControllerService : LocaleControllerService,
              private interestController: InterestControllerService) {
    localeControllerService.getCurrentObservable().subscribe(locale => {
      this.updateTextData(locale);
    });
  }

  ngOnInit(): void {
    this.updateTextData(this.localeControllerService.getCurrentLocale());

    this.interest = this.interest != '' ? this.interest : this.interestController.getCurrentInterest();
  }

  private updateTextData(locale: Locale) {
    for (let translation of this.data.translations) {
      if (translation.cultureCode == locale) {
        this.title = translation.name;
        this.description = translation.description;
        return;
      }
    }

    this.title = this.data.translations[0].name;
    this.description = this.data.translations[0].description;
  }

    protected readonly environment = environment;
}
