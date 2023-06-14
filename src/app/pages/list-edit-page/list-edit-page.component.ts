import {Component, HostBinding, OnInit} from '@angular/core';
import {PrivacyStatus} from "../../enums/PrivacyStatus";
import {RecommendationListType} from "../../enums/RecommendationListType";
import {ListEditPageData} from "../../interfaces/list/ListEditPageData";
import {CurrentUserDataService} from "../../services/current-user-data.service";
import {Router} from "@angular/router";
import {InterestControllerService} from "../../services/interest-controller.service";
import {InterestService} from "../../services/api/interest.service";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-list-edit-page',
  templateUrl: './list-edit-page.component.html',
  styleUrls: ['./list-edit-page.component.css']
})
export class ListEditPageComponent implements OnInit {
  @HostBinding('class') class = 'narrow-content-wrapper';

  colors: Array<Array<string>> = [
    ['DA67DC', '051439', 'E2842C', 'CF2D2D'],
    ['193439', '503143', 'E2842C', 'AD4A2B'],
    ['308777', '31A8FF', '202570', '912AC2']
  ];

  currentColorArray: Array<string> = Array(4);

  listData: ListEditPageData = {
    coverColor: "",
    creator: "",
    interests: Array(),
    name: "List",
    nameUa: "",
    photoUrl: "",
    privacyStatus: PrivacyStatus.AvailableForAll,
    type: RecommendationListType.UserDefined
  };

  availableForAll = PrivacyStatus.AvailableForAll;
  availableForFollowers = PrivacyStatus.AvailableForFollowers;
  availableOnlyForMe = PrivacyStatus.AvailableOnlyForMe;
  constructor(private userDataService: CurrentUserDataService,
              private router: Router,
              private interestsControllerService: InterestControllerService,
              private interestService: InterestService) {
    if(!userDataService.isUserLoggedIn()) {
      router.navigate(['/']);
    } else {
      this.listData.creator = <string>userDataService.getUserId();
    }
  }

  ngOnInit(): void {
    switch (this.interestsControllerService.getCurrentInterest()) {
      case "games":
        this.currentColorArray = this.colors[0];
        break;
      case "books":
        this.currentColorArray = this.colors[1];
        break;
      case "movies":
        this.currentColorArray = this.colors[2];
        break;
    }

    this.listData.coverColor = this.currentColorArray[0];
  }

  createList() {
    console.error(JSON.stringify(this.listData))

    this.interestService.createList(this.listData).subscribe(
      data => {
        console.error('success')
        this.router.navigate(
          [`/${this.interestsControllerService.getCurrentInterest()}/${environment.PROFILE_PAGE_PATH}/${this.userDataService.getUserId()}`]
        );
      },
      error => {
        console.error(error)
      }
    );
  }
}
