import { Injectable } from '@angular/core';
import {Interest, Locale} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataService {
  constructor() { }

  getCurrentInterest() : Interest {
    return <Interest>localStorage.getItem('current_interest') ?? this.saveCurrentInterest('games');
  }

  saveCurrentInterest(interest: Interest) : Interest {
    localStorage.setItem('current_interest', interest)
    return interest
  }

  getCurrentLocale() : Locale {
    return <Locale>localStorage.getItem('current_locale') ?? this.saveCurrentLocale('ua');
  }

  saveCurrentLocale(locale: Locale) : Locale {
    localStorage.setItem('current_locale', locale)
    return locale
  }
}
