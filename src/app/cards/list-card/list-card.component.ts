import {Component, Input, OnInit} from '@angular/core';
import {ListCardData} from "../../interfaces/listCardData";
import {RecommendationListType} from "../../enums/RecommendationListType";
import {PrivacyStatus} from "../../enums/PrivacyStatus";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {Locale} from "../../types/types";

@Component({
  selector: 'list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  @Input('list-data')
  data: ListCardData = {
    creator: "",
    id: 'dsfdf-sdfsdf-sdf',
    name: '',
    nameUa: '',
    coverColor: '#E2842C',
    photoUrl: 'https://wallpapercave.com/uwp/uwp935605.png',
    type: RecommendationListType.System,
    privacyStatus: PrivacyStatus.AvailableForAll
  }

  listName = ''

  constructor(private localeControllerService : LocaleControllerService) {
    localeControllerService.getCurrentObservable().subscribe(locale => {
      this.updateListTitle(locale);
    });
  }

  ngOnInit(): void {
    this.updateListTitle(this.localeControllerService.getCurrentLocale());
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
}
