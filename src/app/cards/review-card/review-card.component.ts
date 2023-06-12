import {Component, Input, OnInit} from '@angular/core';
import {RecommendationListType} from "../../enums/RecommendationListType";
import {ReviewCardData} from "../../interfaces/review/reviewCardData";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {InterestControllerService} from "../../services/interest-controller.service";
import {Locale} from "../../types/types";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css'],
  host:     {
    '[class.color-1]':'index % 4 == 0',
    '[class.color-2]':'index % 4 == 1',
    '[class.color-3]':'index % 4 == 2',
    '[class.color-4]':'index % 4 == 3'
  }
})
export class ReviewCardComponent implements OnInit {
  @Input('index')
  index = 0

  @Input('interest')
  interest = ''

  @Input('review')
  review!: ReviewCardData

  title = '';
  constructor(private localeControllerService : LocaleControllerService,
              private interestController: InterestControllerService) {
    localeControllerService.getCurrentObservable().subscribe(locale => {
      this.updateReviewTitle(locale);
    });
  }

  ngOnInit(): void {
    this.updateReviewTitle(this.localeControllerService.getCurrentLocale());
    this.interest = this.interest != '' ? this.interest : this.interestController.getCurrentInterest();
  }

  private updateReviewTitle(locale: Locale) {
    for (const translation of this.review.interest.translations) {
      if (translation.cultureCode == locale) {
        this.title = translation.name;
        return;
      }
    }

    this.title = this.review.reviewTitle;
  }

  protected readonly environment = environment;
}
