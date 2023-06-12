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

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  popularInterests: Array<InterestCardData> = [];
  systemLists: Array<ListCardData> = [];
  popularAuthors: Array<AuthorCardData> = [];
  reviews: Array<ReviewCardData> = [];

  interest: Interest;

  protected readonly SliderSizeSmall = SliderItemSize.SMALL;
  protected readonly SliderSizeMedium = SliderItemSize.MEDIUM;
  protected readonly SliderSizeBig = SliderItemSize.BIG;

  @HostBinding('class') class!: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private interestControllerService: InterestControllerService,
              private interestService: InterestService,
              private userService: UserService) {

    this.class = "main-content-wrapper"

    this.interest =  this.interestControllerService.getCurrentInterest();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params);

      this.interestService.getPopular().subscribe(
        data => {
          this.popularInterests = data
        },
        error => {
          alert('Error occurred');
        }
      );

      this.interestService.getSystemRecommendations().subscribe(
        data => {
          this.systemLists = data
        },
        error => {
          alert('Error occurred');
        }
      );

      this.userService.getPopularAuthors().subscribe(
        data => {
          this.popularAuthors = data
        },
        error => {
          alert('Error occurred');
        }
      );
    });

  }
}
