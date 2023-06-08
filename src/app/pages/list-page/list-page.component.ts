import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InterestControllerService} from "../../services/interest-controller.service";
import {InterestService} from "../../services/api/interest.service";
import {ListPageData} from "../../interfaces/list/listPageData";
import {LocaleControllerService} from "../../services/locale-controller.service";
import {Locale} from "../../types/types";

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  @HostBinding('class') class = 'narrow-content-wrapper';

  listData!: ListPageData;
  listName!: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private interestService: InterestService,
              private interestControllerService: InterestControllerService,
              private localeControllerService : LocaleControllerService) {

    localeControllerService.getCurrentObservable().subscribe(locale => {
      this.updateTextData(locale);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params);

      this.interestService.getList(params["interestId"]).subscribe(
        list => {
          this.listData = list;

          this.updateTextData(this.localeControllerService.getCurrentLocale());
        },
        error => {
          console.error(error);
        }
      );
    });
  }

  private updateTextData(locale: Locale) {
    let nameEn = this.listData.name;
    let nameUa = this.listData.nameUa;

    if (locale == 'ua') {
      this.listName = nameUa ? nameUa : nameEn
    } else {
      this.listName = nameEn ? nameEn : nameUa
    }
  }
}
