import {Component, OnInit} from '@angular/core';
import {LocalStorageDataService} from "../services/local-storage-data.service";
import {TranslateService} from "@ngx-translate/core";
import {Interest, Locale} from "../types/types";

@Component({
  selector: 'top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isSearchActive = false
  currentInterest!: Interest;
  constructor(public storageService: LocalStorageDataService, private translateService: TranslateService) {
    storageService.getCurrentInterestObserver().subscribe(interest => this.currentInterest = interest)
  }

  ngOnInit() {
  }

  changeLocale(locale: Locale) {
    this.translateService.use(locale);
    this.storageService.saveCurrentLocale(locale);
  }

  protected readonly console = console;

  changeSearchActivity() {
    this.isSearchActive = !this.isSearchActive
  }
}
