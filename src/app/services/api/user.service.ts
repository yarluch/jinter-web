import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {AuthorCardData} from "../../interfaces/user/AuthorCardData";
import {UserModel} from "../../interfaces/user/userModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPopularAuthors() {
    return this.http.get<Array<AuthorCardData>>(`${environment.URL}/Profiles/popular`);
  }

  getUserById(id: string) {
    return this.http.get<UserModel>(`${environment.URL}/Profiles/${id}`);
  }
}
