import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {InterestCardData} from "../../interfaces/InterestCardData";
import {InterestControllerService} from "../interest-controller.service";
import {ListCardData} from "../../interfaces/ListCardData";

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  interest: string = ''
  constructor(private http: HttpClient,
              private interestControllerService: InterestControllerService) {
    interestControllerService.getCurrentInterestObserver()
      .subscribe(interest => this.interest = interest);
  }

  getPopular() {
    return this.http.get<Array<InterestCardData>>(`${environment.URL}/${this.interest}/popular`);
  }

  getSystemRecommendations() {
    let path = this.interest != 'games' ? this.interest : 'g';
    return this.http.get<Array<ListCardData>>(`${environment.URL}/${path}/recommendationlists/system`);
  }
}
