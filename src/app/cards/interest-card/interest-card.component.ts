import {Component, Input, OnInit} from '@angular/core';
import {InterestCardData} from "../../interfaces/interest/interestCardData";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {Locale} from "../../types/types";
import {InterestControllerService} from "../../services/interest-controller.service";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'interest-card',
  templateUrl: './interest-card.component.html',
  styleUrls: ['./interest-card.component.css']
})
export class InterestCardComponent implements OnInit {

  alternativePhoto: string = 'https://assets-prd.ignimgs.com/2020/09/29/genshin-impact-button-fin-1601346152039.jpg'

  @Input('interest-data')
  data: InterestCardData = {
    id: '',
    mainPhotoUrl: 'https://assets-prd.ignimgs.com/2020/09/29/genshin-impact-button-fin-1601346152039.jpg',
    averageCustomerReviewRate: 0,
    translations: []
  }

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
