import { Injectable } from '@angular/core';
import {Locale} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class LocalDataSaverService {

  constructor() { }

  getCurrentLocale() : Locale {
    return <Locale>localStorage.getItem('current_locale') ?? this.saveCurrentLocale('ua');
  }

  saveCurrentLocale(locale: Locale) : Locale {
    localStorage.setItem('current_locale', locale)
    return locale
  }
}
