import {Component, Input, OnInit} from '@angular/core';
import {ReviewCardData} from "../../interfaces/review/reviewCardData";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {InterestControllerService} from "../../services/interest-controller.service";
import {Locale} from "../../types/types";
import {environment} from "../../../environments/environment.prod";
import {CurrentUserDataService} from "../../services/current-user-data.service";
import {InterestService} from "../../services/api/interest.service";

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

  showLikeButton = false;

  heartImgPath = '';
  constructor(private localeControllerService : LocaleControllerService,
              private interestController: InterestControllerService,
              private interestService: InterestService,
              private currentUserService: CurrentUserDataService) {
    localeControllerService.getCurrentObservable().subscribe(locale => {
      this.updateReviewTitle(locale);
    });

    currentUserService.getUserObservable().subscribe(user => {
      this.showLikeButton = user != null && user.id != this.review.author.id;
    });
  }

  ngOnInit(): void {
    this.updateReviewTitle(this.localeControllerService.getCurrentLocale());
    this.interest = this.interest != '' ? this.interest : this.interestController.getCurrentInterest();
    this.updateHeart();
    this.showLikeButton = this.currentUserService.getUserId() != null && this.currentUserService.getUserId() != this.review.author.id;
  }

  private updateHeart() {
    if (this.interest == 'movies' && this.index % 4 == 0) {
      this.heartImgPath = this.review.isLikedByLoggedUser ? 'heart_filled_dark' : 'heart_dark';
    } else {
      this.heartImgPath = this.review.isLikedByLoggedUser ? 'heart_filled' : 'heart';
    }
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

  changeIsLikedState() {
    this.interestService.likeReview(this.review.id).subscribe(
      data => {
        this.review.isLikedByLoggedUser = !this.review.isLikedByLoggedUser;
        this.updateHeart();
      },
      error => {
        console.error(error)
      }
    );
  }
}
