import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataService {
  constructor() { }

  getCurrentInterest() : string {
    return localStorage.getItem("current_interest") ?? this.saveCurrentInterest("games");
  }

  saveCurrentInterest(interest: string) : string {
    localStorage.setItem("current_interest", interest)
    return interest
  }

  getCurrentLocale() : string {
    return localStorage.getItem("current_locale") ?? this.saveCurrentLocale("uk");
  }

  saveCurrentLocale(locale: string) : string {
    localStorage.setItem("current_locale", locale)
    return locale
  }
}
