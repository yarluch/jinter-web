import {Injectable} from '@angular/core';
import {Interest, Locale} from "../types/types";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageDataService {
  private currentInterest = new BehaviorSubject<Interest>('games');
  constructor() { }

  getCurrentInterestObserver() : Observable<Interest> {
    let interest: Interest = <Interest>localStorage.getItem('current_interest');
    console.error()
    if (!interest) {
      this.saveCurrentInterest('games')
    } else if (this.currentInterest.getValue() != interest) {
      this.saveCurrentInterest(interest)
    }

    return this.currentInterest.asObservable();
  }
  getCurrentInterest(): Interest {
    return <Interest>localStorage.getItem('current_interest') ?? 'games';
  }
  saveCurrentInterest(interest: Interest) {
    localStorage.setItem('current_interest', interest);
    this.currentInterest.next(interest);
  }

  getCurrentLocale() : Locale {
    return <Locale>localStorage.getItem('current_locale') ?? this.saveCurrentLocale('ua');
  }

  saveCurrentLocale(locale: Locale) : Locale {
    localStorage.setItem('current_locale', locale)
    return locale
  }
}
