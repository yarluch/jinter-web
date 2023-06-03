import { Injectable } from '@angular/core';
import {LoginModel} from "../interfaces/user/loginModel";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserDataService {

  private observableUserData = new BehaviorSubject<LoginModel | null>(null);
  userData!: LoginModel | null;

  readonly USER_DATA_KEY: string = 'USER_DATA'
  constructor() {
    this.observableUserData.subscribe(data => {
      this.userData = data;
    });

    this.observableUserData.next(
      JSON.parse(localStorage.getItem(this.USER_DATA_KEY) ?? 'null'));
  }

  setUserData(data: LoginModel) {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));

    this.observableUserData.next(data);
  }

  removeUserData() {
    localStorage.removeItem(this.USER_DATA_KEY);

    this.observableUserData.next(null);
  }

  getUserObservable() {
    return this.observableUserData.asObservable()
  }
  getUserId() {
    return this.userData?.id
  }

  getUserToken() {
    return this.userData?.token
  }
}
