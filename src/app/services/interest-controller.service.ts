import {Injectable} from '@angular/core';
import {Interest} from "../types/types";
import {BehaviorSubject, Observable} from "rxjs";
import {Params, Router} from "@angular/router";
import {environment} from "../../environments/environment.prod";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class InterestControllerService {
  private currentInterest = new BehaviorSubject<Interest>('games');
  private redirectablePages = [environment.INTEREST_PAGE_PATH, environment.LIST_PAGE_PATH]

  constructor(private router: Router, private location: Location) {
  }

  getCurrentInterestObserver(): Observable<Interest> {
    let interest: Interest = <Interest>localStorage.getItem('current_interest');

    if (!this.isInterestValid(interest)) {
      this.saveCurrentInterest('games')
    } else if (this.currentInterest.getValue() != interest) {
      this.saveCurrentInterest(interest)
    }

    return this.currentInterest.asObservable();
  }

  getCurrentInterest(): Interest {
    let interest = <Interest>localStorage.getItem('current_interest')

    if (this.isInterestValid(interest)) {
      return interest;
    }

    localStorage.setItem('current_interest', 'games');
    return 'games';
  }

  saveCurrentInterest(interest: Interest) {
    if (this.isInterestValid(interest)) {
      localStorage.setItem('current_interest', interest);
      this.currentInterest.next(interest);
    }
  }

  changePageInterest(interest: Interest) {
    this.saveCurrentInterest(interest);

    let url = this.router.url;
    if (this.redirectablePages.some(page => url.includes(page))) {
      this.router.navigate([`/${interest}`]);
      return;
    }

    let noInterestPath = url.replace(/^(\/games|\/books|\/movies)/, '');
    let newUrl = `/${interest}${noInterestPath}`;

    this.router.navigate([newUrl]);
  }

  configureLinkAccess(params: Params) {
    let url = this.router.url;
    let isRedirectable = this.redirectablePages.some(page => url.includes(page));
    let isInterestIncorrect = !params.hasOwnProperty('interest-type') || !this.isInterestValid(params['interest-type']);
    let currentInterest = this.getCurrentInterest()



    if (isRedirectable && isInterestIncorrect) {
      this.location.replaceState(`/${environment.NOT_FOUND_PAGE_PATH}`);
    } else if (isInterestIncorrect) {
      let noInterestPath = url.replace(/^(\/[a-zA-Z]+)/, '');
      let newUrl = `/${currentInterest}${noInterestPath}`
      this.location.replaceState(newUrl);
    }

    if (<Interest>params['interest-type'] != currentInterest) {
      this.saveCurrentInterest(<Interest>params['interest-type']);
    }
  }

  private isInterestValid(interest: String) {
    return interest === environment.INTEREST_GAMES ||
      interest === environment.INTEREST_BOOKS ||
      interest === environment.INTEREST_MOVIES;
  }
}
