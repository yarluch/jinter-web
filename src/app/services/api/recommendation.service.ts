import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {InterestControllerService} from "../interest-controller.service";
import {environment} from "../../../environments/environment.prod";
import {InterestCardData} from "../../interfaces/interest/interestCardData";
import {map} from "rxjs";
import {Recommendation} from "../../interfaces/recommendation/recommendation";
import {RecommendationPageData} from "../../interfaces/recommendation/recommendationPageData";
import {InterestCardDataFull} from "../../interfaces/interest/interestCardDataFull";
import {Interest} from "../../types/types";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  interest: string = ''

  constructor(private http: HttpClient,
              private interestControllerService: InterestControllerService) {
    interestControllerService.getCurrentInterestObserver()
      .subscribe(interest => this.interest = interest);
  }

  getRecommendations(genres: Array<string>) {
    let genress = {genres: genres}

    return this.http.post<Recommendation>(`${environment.URL}/recommendation`,
      genress).pipe(
      map((recommendation: Recommendation): RecommendationPageData => {
        return this.recommendationToPageData(recommendation);
      })
    );
  }

  private recommendationToPageData(recommendation: Recommendation) {
    let result: RecommendationPageData = {
      currentInterest: Array(),
      anotherInterests: Array()
    }

    switch (this.interest) {
      case "books":
        result.currentInterest = recommendation.books;
        result.anotherInterests.push(
          ...this.CardDataToCardDataFull(recommendation.games, 'games'));
        result.anotherInterests.push(
          ...this.CardDataToCardDataFull(recommendation.movies, 'movies'));
        break;
      case "movies":
        result.currentInterest = recommendation.movies;
        result.anotherInterests.push(
          ...this.CardDataToCardDataFull(recommendation.games, 'games'));
        result.anotherInterests.push(
          ...this.CardDataToCardDataFull(recommendation.books, 'books'));
        break;
      default:
        result.currentInterest = recommendation.games;
        result.anotherInterests.push(
          ...this.CardDataToCardDataFull(recommendation.books, 'books'));
        result.anotherInterests.push(
          ...this.CardDataToCardDataFull(recommendation.movies, 'movies'));
        break;
    }

    return result;
  }

  private CardDataToCardDataFull(interests: Array<InterestCardData>, interestType: Interest) {
    let result = Array<InterestCardDataFull>()
    for (let interest of interests) {
      result.push({
        interest: interestType,
        data: interest
      })
    }

    return result;
  }
}
