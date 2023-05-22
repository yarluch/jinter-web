import {Component, Input, OnInit} from '@angular/core';
import {ListCardData} from "../../interfaces/ListCardData";
import {RecommendationListType} from "../../enums/RecommendationListType";
import {PrivacyStatus} from "../../enums/PrivacyStatus";

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
    name: 'Games List',
    coverColor: "#E2842C",
    photoUrl: "https://wallpapercave.com/uwp/uwp935605.png",
    type: RecommendationListType.System,
    privacyStatus: PrivacyStatus.AvailableForAll
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  protected readonly RecommendationListType = RecommendationListType;
}
