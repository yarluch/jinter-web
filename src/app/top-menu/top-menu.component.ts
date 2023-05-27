import {Component, OnInit} from '@angular/core';
import {InterestControllerService} from "../services/interest-controller.service";
import {TranslateService} from "@ngx-translate/core";
import {Interest, Locale} from "../types/types";
import {LocalDataSaverService} from "../services/local-data-saver.service";

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isSearchActive = false
  currentInterest!: Interest;
  constructor(public interestControllerService: InterestControllerService,
              private localDataSaverService : LocalDataSaverService,
              private translateService: TranslateService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest => this.currentInterest = interest)
  }

  ngOnInit() {
  }

  changeLocale(locale: Locale) {
    this.translateService.use(locale);
    this.localDataSaverService.saveCurrentLocale(locale);
  }

  protected readonly console = console;

  changeSearchActivity() {
    this.isSearchActive = !this.isSearchActive
  }
}
