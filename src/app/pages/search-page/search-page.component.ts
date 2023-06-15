import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {InterestControllerService} from "../../services/interest-controller.service";
import {InterestService} from "../../services/api/interest.service";
import {RecommendationService} from "../../services/api/recommendation.service";
import {SearchService} from "../../services/api/search.service";
import {SearchAnswerModel} from "../../interfaces/search/searchAnswerModel";
import {Interest, Locale} from "../../types/types";
import {environment} from "../../../environments/environment.prod";
import {Filter} from "../../interfaces/search/filter";
import {Tag} from "../../interfaces/interest/tags/tag";

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

  franchiseFilter: Filter = {
    type: "franchiseStatus",
    value: {
      isFranchise: undefined
    }
  }

  genres: Array<Tag> = [];
  genresActive: Array<boolean> = [];

  areFiltersAvailable = [false, false, false];

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

    this.searchService.getGenres().subscribe(
      data => {
        this.genres = data;
        this.genresActive = Array(this.genres.length)
        this.localeControllerService.getCurrentObservable().subscribe(locale =>
          this.updateGenresNames(locale)
        );

      },
      error => {
        console.error(error);
      }
    );
  }

  updateGenresNames(locale: Locale) {
    for (let genre of this.genres) {
      for (let translation of genre.translations) {
        if (translation.cultureCode == locale) {
          genre.name = translation.name;
          break;
        }
      }
    }
  }

  updateSearch() {
    let filters: Array<Filter> = Array();
    filters.push({
      type: "name",
      value: this.searchWord
    });

    if (this.franchiseFilter.value.isFranchise !== undefined) {
      filters.push(this.franchiseFilter);
    }

    let genres: Array<string> = Array();

    for (let i = 0; i < this.genres.length; i++) {
      if (this.genresActive[i]) {
        genres.push(this.genres[i].id);
      }
    }

    if (genres.length > 0) {
      filters.push({
        type: "genres",
        value: genres
      });
    }

    this.searchService.findAndFilter(filters).subscribe(
      data => {
        this.searchResult = data;
      },
      error => {
        console.error(error);
      }
    );
  }
}
