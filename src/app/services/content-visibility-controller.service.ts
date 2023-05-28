import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentVisibilityControllerService {


  private isInterfaceVisible = new BehaviorSubject<boolean>(true);
  private isBlackoutActive = new BehaviorSubject<boolean>(false);
  private isDialogBlackoutActive = new BehaviorSubject<boolean>(false);

  constructor() { }

  getIsInterfaceVisible(): Observable<boolean> {
    return this.isInterfaceVisible.asObservable();
  }
  setIsInterfaceVisible(value: boolean) {
    this.isInterfaceVisible.next(value);
  }

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
}
