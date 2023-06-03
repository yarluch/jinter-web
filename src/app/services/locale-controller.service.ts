import { Injectable } from '@angular/core';
import {Locale} from "../types/types";
import {BehaviorSubject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LocaleControllerService {
  private currentLocale = new BehaviorSubject<Locale>('ua');
  constructor(private translateService: TranslateService) {
    let locale = <Locale>localStorage.getItem('current_locale') ?? 'ua';

    this.changeCurrentLocale(locale);
  }

  getCurrentLocale() : Locale {
    return <Locale>localStorage.getItem('current_locale');
  }

  getCurrentObservable() {
    return this.currentLocale.asObservable();
  }

  changeCurrentLocale(locale: Locale) {
    localStorage.setItem('current_locale', locale)
    this.translateService.use(locale);
    this.currentLocale.next(locale);
  }
}
