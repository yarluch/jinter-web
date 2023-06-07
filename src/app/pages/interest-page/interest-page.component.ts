import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {InterestControllerService} from "../../services/interest-controller.service";
import {InterestPageData} from "../../interfaces/interest/interestPageData";
import {InterestService} from "../../services/api/interest.service";
import {SliderItemSize} from "../../enums/SliderItemSize";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {Locale} from "../../types/types";
import {RecommendationPageData} from "../../interfaces/recommendation/recommendationPageData";
import {RecommendationService} from "../../services/api/recommendation.service";


@Component({
  selector: 'interest-page',
  templateUrl: './interest-page.component.html',
  styleUrls: ['./interest-page.component.css']
})
export class InterestPageComponent implements OnInit {

  @HostBinding('class') class!: string;

  interest = ''

  interestData!: InterestPageData;
  recommendations!: RecommendationPageData;

  title = '';
  description = '';

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private localeControllerService : LocaleControllerService,
              private interestControllerService: InterestControllerService,
              private interestService: InterestService,
              private recommendationService: RecommendationService) {
    this.class = "main-content-wrapper"

    interestControllerService.getCurrentInterestObserver().subscribe(interest => {
      this.interest = interest
    });

    localeControllerService.getCurrentObservable().subscribe(locale => {
      this.updateTextData(locale);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params);

      this.interestService.getInterest(params["interestId"]).subscribe(
        interest => {
          this.interestData = interest;

          this.updateTextData(this.localeControllerService.getCurrentLocale());

          this.getRecommendations();
        },
        error => {
          console.error(error);
        }
      );
    });


  }

  private updateTextData(locale: Locale) {
    for (let translation of this.interestData.translations) {
      if (translation.cultureCode == locale) {
        this.interestData.name = translation.name;
        this.interestData.description = translation.description;
        return;
      }
    }
  }

  private getRecommendations() {
    let genres = Array<string>();

    for (let genre of this.interestData.genres) {
      genres.push(genre.id);
    }

    this.recommendationService.getRecommendations(genres).subscribe(
      recommendations => {
        this.recommendations = recommendations;
      },
      error => {
        console.error(error);
      }
    );
  }

  protected readonly MEDIUM = SliderItemSize.MEDIUM;
  protected readonly MEDIUM_2 = SliderItemSize.MEDIUM_2;
}
