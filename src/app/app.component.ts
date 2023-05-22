import {Component, HostBinding, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageDataService} from "./services/local-storage-data.service";
import {SliderItemSize} from "./enums/SliderItemSize";

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jinter';

  @HostBinding('class') class;

  constructor(private translateService: TranslateService, public storageService: LocalStorageDataService) {
    this.class = storageService.getCurrentInterest()
  }

  ngOnInit(): void {
    this.translateService.use(this.storageService.getCurrentLocale());
  }
}
