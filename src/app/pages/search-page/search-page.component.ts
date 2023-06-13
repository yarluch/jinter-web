import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {InterestControllerService} from "../../services/interest-controller.service";
import {InterestService} from "../../services/api/interest.service";
import {RecommendationService} from "../../services/api/recommendation.service";
import {SearchService} from "../../services/api/search.service";
import {SearchAnswerModel} from "../../interfaces/search/searchAnswerModel";
import {Interest} from "../../types/types";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  host: {
    'class': 'main-content-wrapper'
  }
})
export class SearchPageComponent implements OnInit {

  searchResult!: SearchAnswerModel;
  searchWord = '';

  currentInterest!: Interest;

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private localeControllerService : LocaleControllerService,
              private interestControllerService: InterestControllerService,
              private searchService: SearchService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest =>
      this.currentInterest = interest
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params);

      this.searchWord = params['keyword'];

      this.searchService.findByKeyword(params['keyword']).subscribe(
        data => {
          this.searchResult = data;
        },
        error => {
          console.error(error);
        }
      );
    });
  }


  updateSearch() {
    /*this.searchService.findByKeyword(this.searchWord).subscribe(
      data => {
        this.searchResult = data;
      },
      error => {
        console.error(error);
      }
    );*/
    this.router.navigate(
      [`/${this.currentInterest}/${environment.SEARCH_PAGE_PATH}/${this.searchWord}`]);
  }
}
