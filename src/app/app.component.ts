import {Component, HostBinding, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {InterestControllerService} from "./services/interest-controller.service";
import {Interest} from "./types/types";
import {LocalDataSaverService} from "./services/local-data-saver.service";

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

  constructor(private translateService: TranslateService,
              private localDataSaverService : LocalDataSaverService,
              private interestControllerService: InterestControllerService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest => this.class = interest)
  }

  ngOnInit(): void {
    this.translateService.use(this.localDataSaverService.getCurrentLocale());
  }

  changeInterest(interest: Interest) {
    this.interestControllerService.changePageInterest(interest);
  }

  changeContentVisibility() {
    this.isPageContentHidden = !this.isPageContentHidden;
  }
}
