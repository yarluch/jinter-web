import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentVisibilityControllerService {
  private isBlackoutActive = new BehaviorSubject<boolean>(false);
  private isDialogBlackoutActive = new BehaviorSubject<boolean>(false);
  private loginSingUpState = new BehaviorSubject<string>('');

  constructor() { }

  getIsBlackoutActive(): Observable<boolean> {
    return this.isBlackoutActive.asObservable();
  }
  setIsBlackoutActive(value: boolean) {
    this.isBlackoutActive.next(value);
  }

  getIsDialogBlackoutActive(): Observable<boolean> {
    return this.isDialogBlackoutActive.asObservable();
  }
  setIsDialogBlackoutActive(value: boolean) {
    this.isDialogBlackoutActive.next(value);
  }

  getLoginSingUpState(): Observable<string> {
    return this.loginSingUpState.asObservable();
  }
  setLoginSingUpState(value: string) {
    this.loginSingUpState.next(value);
  }
}
