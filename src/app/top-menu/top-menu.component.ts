import {Component, OnInit} from '@angular/core';
import {InterestControllerService} from "../services/interest-controller.service";
import {TranslateService} from "@ngx-translate/core";
import {Interest, Locale} from "../types/types";
import {LocalDataSaverService} from "../services/local-data-saver.service";
import {ContentVisibilityControllerService} from "../services/content-visibility-controller.service";
import {environment} from "../../environments/environment.prod";
import {CurrentUserDataService} from "../services/current-user-data.service";

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
  constructor(public interestControllerService: InterestControllerService,
              private localDataSaverService : LocalDataSaverService,
              private translateService: TranslateService,
              private visibilityControllerService: ContentVisibilityControllerService,
              private userDataService: CurrentUserDataService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest => this.currentInterest = interest)

    this.currentLocale = localDataSaverService.getCurrentLocale()

    userDataService.getUserObservable().subscribe(data => {
      this.isUserLoggedIn = data != null

      if(data)
        this.userName = data.username
    });
  }

  ngOnInit() {
  }

  changeLocale(locale: Locale) {
    this.translateService.use(locale);
    this.localDataSaverService.saveCurrentLocale(locale);
    this.currentLocale = locale;
  }

  protected readonly console = console;

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
}
