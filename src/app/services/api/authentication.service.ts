import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable} from "rxjs";
import {RegisterDTO} from "../../interfaces/user/registerDTO";
import {LoginModel} from "../../interfaces/user/LoginModel";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  isUsernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.URL}/Users/by-username/${username}`);
  }

  isEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.URL}/Users/by-email/${email}`);
  }

  login(user: {userName: string, password: string}): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${environment.URL}/login`, user);
  }

  register(user: RegisterDTO): Observable<LoginModel> {
    return this.http.post<LoginModel>(`${environment.URL}/register`, user);
  }
}
