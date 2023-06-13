import {Component, OnInit} from '@angular/core';
import {InterestControllerService} from "../services/interest-controller.service";
import {TranslateService} from "@ngx-translate/core";
import {Interest, Locale} from "../types/types";
import {LocaleControllerService} from "../services/locale-controller.service";
import {ContentVisibilityControllerService} from "../services/content-visibility-controller.service";
import {environment} from "../../environments/environment.prod";
import {CurrentUserDataService} from "../services/current-user-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isSearchActive = false
  isUserLoggedIn = false
  userName = ''

  currentLocale: string = ''

  currentInterest!: Interest;

  searchWord: string = '';

  constructor(private router: Router,
              public interestControllerService: InterestControllerService,
              private localeControllerService : LocaleControllerService,
              private translateService: TranslateService,
              private visibilityControllerService: ContentVisibilityControllerService,
              private userDataService: CurrentUserDataService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest => this.currentInterest = interest)

    localeControllerService.getCurrentObservable().subscribe(locale => {
      this.currentLocale = locale;
    });

    userDataService.getUserObservable().subscribe(data => {
      this.isUserLoggedIn = data != null

      if(data)
        this.userName = data.username
    });
  }

  ngOnInit() {
  }

  changeLocale(locale: Locale) {
    this.localeControllerService.changeCurrentLocale(locale);
  }


  changeSearchActivity() {
    this.isSearchActive = !this.isSearchActive
  }

  openLogin() {
    this.visibilityControllerService.setLoginSingUpState(environment.LOGIN)
  }

  openSignUp() {
    this.visibilityControllerService.setLoginSingUpState(environment.SIGN_UP)
  }

  logout() {
    this.userDataService.removeUserData();
  }

  openSearch() {
    this.router.navigate(
      [`/${this.currentInterest}/${environment.SEARCH_PAGE_PATH}/${this.searchWord}`]);

    this.searchWord = '';
    this.isSearchActive = false;
  }
}
