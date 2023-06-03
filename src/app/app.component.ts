import {Component, HostBinding, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {InterestControllerService} from "./services/interest-controller.service";
import {LocaleControllerService} from "./services/locale-controller.service";
import {ContentVisibilityControllerService} from "./services/content-visibility-controller.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host:     {
    '[class.hidden-content]':'isBlackoutActive',
    '[class.hidden-interface]':'isDialogBlackoutActive'
  }
})
export class AppComponent implements OnInit {
  title = 'Jinter';

  isBlackoutActive = false;
  isDialogBlackoutActive = false;


  @HostBinding('class') class!: string;


  constructor(private translateService: TranslateService,
              private localeControllerService : LocaleControllerService,
              private interestControllerService: InterestControllerService,
              private visibilityControllerService: ContentVisibilityControllerService) {
    interestControllerService.getCurrentInterestObserver()
      .subscribe(interest => this.class = interest);

    visibilityControllerService.getIsBlackoutActive()
      .subscribe(isActive => this.isBlackoutActive = isActive);
    visibilityControllerService.getIsDialogBlackoutActive()
      .subscribe(isActive => this.isDialogBlackoutActive = isActive);
  }

  ngOnInit(): void {
  }
}
