import {Component, HostBinding, OnInit} from '@angular/core';
import {UserModel} from "../../interfaces/user/userModel";
import {UserService} from "../../services/api/user.service";
import {InterestControllerService} from "../../services/interest-controller.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InterestCardData} from "../../interfaces/interest/interestCardData";
import {InterestService} from "../../services/api/interest.service";
import {ListCardData} from "../../interfaces/list/listCardData";
import {Interest} from "../../types/types";
import {ReviewCardData} from "../../interfaces/review/reviewCardData";
import {CurrentUserDataService} from "../../services/current-user-data.service";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @HostBinding('class') class = 'narrow-content-wrapper';

  user!: UserModel;
  currentTab = 0;

  userActivityLists: Array<Array<InterestCardData>> = Array(3);
  userLists: Array<ListCardData> = Array();
  userReviews: Array<ReviewCardData> = Array();
  interest!: Interest;

  constructor(private userService: UserService,
              private interestService: InterestService,
              private interestControllerService: InterestControllerService,
              private router: Router, private route: ActivatedRoute,
              public currentUserService: CurrentUserDataService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest =>
      this.interest = interest
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params);

      this.userService.getUserById(params['userId']).subscribe(
        data => {
          this.user = data
        },
        error => {
          alert('Error occurred');
        }
      );

      for (let i = 1; i < 4; i++) {
        this.interestService.getUserActivityList(params['userId'], i).subscribe(
          data => {
            this.userActivityLists[i-1] = data;
          },
          error => {
            alert('Error occurred');
          }
        );
      }

      this.interestService.getUserLists(params['userId']).subscribe(
        data => {
          this.userLists = data;
        },
        error => {
          alert('Error occurred');
        }
      );

      this.interestService.getUserReviews(params['userId']).subscribe(
        data => {
          this.userReviews = data;
        },
        error => {
          alert('Error occurred');
        }
      );
    });
  }

  openListCreationPage() {
    this.router.navigate([`/${this.interest}/${environment.CREATE_LIST_PATH}`]);
  }
}
