import {Component, HostBinding, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageDataService} from "./services/local-storage-data.service";
import {Interest} from "./types/types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host:     {
    '[class.hidden-content]':'isPageContentHidden',
    '[class.hidden-interface]':'isInterfaceHidden'
  }
})
export class AppComponent implements OnInit {
  title = 'Jinter';

  isPageContentHidden = false;
  isInterfaceHidden = false;

  @HostBinding('class') class!: string;

  constructor(private translateService: TranslateService, private storageService: LocalStorageDataService) {
    storageService.getCurrentInterestObserver().subscribe(interest => this.class = interest)
    /*this.class = storageService.getCurrentInterest();*/
  }

  ngOnInit(): void {
    this.translateService.use(this.storageService.getCurrentLocale());
  }

  changeInterest(interest: Interest) {
    /*this.class = this.storageService.saveCurrentInterest(interest);*/
    this.storageService.saveCurrentInterest(interest);
  }

  changeContentVisibility() {
    this.isPageContentHidden = !this.isPageContentHidden;
  }
}
