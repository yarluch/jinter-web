import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {InterestControllerService} from "../../services/interest-controller.service";
import {InterestService} from "../../services/api/interest.service";
import {UserService} from "../../services/api/user.service";
import {CurrentUserDataService} from "../../services/current-user-data.service";
import {InterestCardData} from "../../interfaces/interest/interestCardData";
import {ReviewCardData} from "../../interfaces/review/reviewCardData";
import {SliderItemSize} from "../../enums/SliderItemSize";
import {Interest} from "../../types/types";

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.css']
})
export class FavoritePageComponent implements OnInit {

  interests: Array<InterestCardData> = [];
  reviews: Array<ReviewCardData> = [];
  SliderSizeSmall = SliderItemSize.SMALL;

  currentInterest!: Interest;

  @HostBinding('class') class = "main-content-wrapper";

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private interestControllerService: InterestControllerService,
              private interestService: InterestService,
              private userService: UserService,
              private userDataService: CurrentUserDataService) {
    userDataService.getUserObservable().subscribe(user => {
        if(!user) {
          router.navigate(['/']);
        }
      }
    );


    interestControllerService.getCurrentInterestObserver().subscribe(
      interest => this.currentInterest = interest);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params);
      this.interestService.getFavoriteInterests().subscribe(
        data => {
          this.interests = data;
        },
        error => {
          alert('Error occurred');
        }
      );

      this.interestService.getFavoriteReviews().subscribe(
        data => {
          this.reviews = data
        },
        error => {
          alert('Error occurred');
        }
      );
    });
  }

}
