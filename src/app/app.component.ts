import {Component, HostBinding, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {InterestControllerService} from "./services/interest-controller.service";
import {LocalDataSaverService} from "./services/local-data-saver.service";
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

  /*isInterfaceVisible!: boolean;*/

  @HostBinding('class') class!: string;


  constructor(private translateService: TranslateService,
              private localDataSaverService : LocalDataSaverService,
              private interestControllerService: InterestControllerService,
              private visibilityControllerService: ContentVisibilityControllerService) {
    interestControllerService.getCurrentInterestObserver()
      .subscribe(interest => this.class = interest);

    /*visibilityControllerService.getIsInterfaceVisible()
      .subscribe(isVisible => this.isInterfaceVisible = isVisible);*/
    visibilityControllerService.getIsBlackoutActive()
      .subscribe(isActive => this.isBlackoutActive = isActive);
    visibilityControllerService.getIsDialogBlackoutActive()
      .subscribe(isActive => this.isDialogBlackoutActive = isActive);
  }

  ngOnInit(): void {
    this.translateService.use(this.localDataSaverService.getCurrentLocale());
  }
}
