import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../../interfaces/user/loginModel";
import {environment} from "../../../environments/environment.prod";
import {SearchRequestModel} from "../../interfaces/search/searchRequestModel";
import {SearchAnswerModel} from "../../interfaces/search/searchAnswerModel";
import {InterestControllerService} from "../interest-controller.service";
import {Interest} from "../../types/types";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  currentInterest!: Interest
  constructor(private http: HttpClient,
              private interestControllerService: InterestControllerService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest =>
      this.currentInterest = interest
    );
  }

  findByKeyword(keyWord: string) {
    let requestData: SearchRequestModel = {
      filters: [
        {
          type: "name",
          value: keyWord
        }
      ],
      paginationParams: {page: 1, pageSize: 100},
      sortingMethod: 0
    }

    return this.http.post<SearchAnswerModel>(`${environment.URL}/${this.currentInterest}/search`, requestData);
  }
}
