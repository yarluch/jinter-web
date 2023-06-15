import {Component, HostBinding, OnInit} from '@angular/core';
import {SliderItemSize} from "../../enums/SliderItemSize";
import {ActivatedRoute, Router} from "@angular/router";
import {InterestControllerService} from "../../services/interest-controller.service";
import {Location} from "@angular/common";
import {InterestCardData} from "../../interfaces/interest/interestCardData";
import {InterestService} from "../../services/api/interest.service";
import {ListCardData} from "../../interfaces/list/listCardData";
import {UserService} from "../../services/api/user.service";
import {AuthorCardData} from "../../interfaces/user/AuthorCardData";
import {Interest} from "../../types/types";
import {ReviewCardData} from "../../interfaces/review/reviewCardData";
import {CurrentUserDataService} from "../../services/current-user-data.service";
import {LoginModel} from "../../interfaces/user/loginModel";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  popularInterests: Array<InterestCardData> = [];
  systemLists: Array<ListCardData> = [];
  popularAuthors: Array<AuthorCardData> = [];

  userRecommendations: Array<InterestCardData> = [];
  reviews: Array<ReviewCardData> = [];

  interest: Interest;
  user: LoginModel | null = null;

  recommendationsReady = false;
  reviewsReady = false

  protected readonly SliderSizeSmall = SliderItemSize.SMALL;
  protected readonly SliderSizeMedium = SliderItemSize.MEDIUM;
  protected readonly SliderSizeBig = SliderItemSize.BIG;

  @HostBinding('class') class = "main-content-wrapper";

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private interestControllerService: InterestControllerService,
              private interestService: InterestService,
              private userService: UserService,
              private currentUserService: CurrentUserDataService) {

    this.interest =  this.interestControllerService.getCurrentInterest();

    currentUserService.getUserObservable().subscribe(user => {
      this.user = user;

      if (this.user) {
        this.interestService.getUserRecommendations().subscribe(
          data => {
            this.userRecommendations = data
          },
          error => {
            console.error('Error occurred');
          }
        );

        this.interestService.getFollowingReviews().subscribe(
          data => {
            this.reviews = data
          },
          error => {
            console.error('Error occurred');
          }
        );
      } else {
        this.userRecommendations = Array();
        this.reviews = Array();
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params);

      this.interestService.getPopular().subscribe(
        data => {
          this.popularInterests = data
        },
        error => {
          console.error('Error occurred');
        }
      );

      this.interestService.getSystemRecommendations().subscribe(
        data => {
          this.systemLists = data
        },
        error => {
          console.error('Error occurred');
        }
      );

      this.userService.getPopularAuthors().subscribe(
        data => {
          this.popularAuthors = data
        },
        error => {
          console.error('Error occurred');
        }
      );

      if (this.user) {
        this.interestService.getUserRecommendations().subscribe(
          data => {
            this.userRecommendations = data;
            this.recommendationsReady = true;
          },
          error => {
            console.error('Error occurred');
          }
        );

        this.interestService.getFollowingReviews().subscribe(
          data => {
            this.reviews = data
            this.reviewsReady = true;
          },
          error => {
            console.error('Error occurred');
          }
        );
      } else {
        this.recommendationsReady = true;
        this.reviewsReady = true;
      }
    });
  }
}
