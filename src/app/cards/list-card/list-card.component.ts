import {Component, Input, OnInit} from '@angular/core';
import {ListCardData} from "../../interfaces/listCardData";
import {RecommendationListType} from "../../enums/RecommendationListType";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {Locale} from "../../types/types";
import {environment} from "../../../environments/environment.prod";
import {InterestControllerService} from "../../services/interest-controller.service";

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  @Input('list-data')
  data!: ListCardData;

  listName = ''

  @Input('interest')
  interest = ''

  constructor(private localeControllerService : LocaleControllerService,
              private interestController: InterestControllerService) {
    localeControllerService.getCurrentObservable().subscribe(locale => {
      this.updateListTitle(locale);
    });
  }

  ngOnInit(): void {
    this.updateListTitle(this.localeControllerService.getCurrentLocale());

    this.interest = this.interest != '' ? this.interest : this.interestController.getCurrentInterest();
  }

  updateListTitle(locale: Locale) {
    let nameEn = this.data.name;
    let nameUa = this.data.nameUa;

    if (locale == 'ua') {
      this.listName = nameUa ? nameUa : nameEn
    } else {
      this.listName = nameEn ? nameEn : nameUa
    }
  }

  protected readonly RecommendationListType = RecommendationListType;
  protected readonly environment = environment;
}
