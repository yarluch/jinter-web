import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {AuthorCardData} from "../../interfaces/user/AuthorCardData";
import {UserModel} from "../../interfaces/user/userModel";
import {CurrentUserDataService} from "../current-user-data.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private userDataService: CurrentUserDataService) { }

  getPopularAuthors() {
    let token = this.userDataService.getUserToken();
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Array<AuthorCardData>>(`${environment.URL}/Profiles/popular`, {headers});
  }

  getUserById(id: string) {
    return this.http.get<UserModel>(`${environment.URL}/Profiles/${id}`);
  }

  subscribe(userId: string) {
    let token = this.userDataService.getUserToken();
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(
      `${environment.URL}/Followings/${userId}/toggle`,
      {}, {headers});
  }
}
