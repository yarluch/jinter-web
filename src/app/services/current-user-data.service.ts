import { Injectable } from '@angular/core';
import {LoginModel} from "../interfaces/user/loginModel";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserDataService {
  private userData = new BehaviorSubject<LoginModel | null>(null);

  readonly USER_DATA_KEY: string = 'USER_DATA'
  constructor() {
    this.userData.next(
      JSON.parse(localStorage.getItem(this.USER_DATA_KEY) ?? 'null'));
  }

  setUserData(data: LoginModel) {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));

    this.userData.next(data);
  }

  removeUserData() {
    localStorage.removeItem(this.USER_DATA_KEY);

    this.userData.next(null);
  }

  getUserObservable() {
    return this.userData.asObservable()
  }

  isUserLoggedIn() {
    return this.userData.value != null;
  }

  getUserId() {
    return this.userData.value?.id
  }

  getUserToken() {
    return this.userData.value?.token
  }
}
