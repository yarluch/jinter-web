import {Component, Input, OnInit} from '@angular/core';
import {AuthorCardData} from "../../interfaces/user/AuthorCardData";
import {CurrentUserDataService} from "../../services/current-user-data.service";
import {UserService} from "../../services/api/user.service";

@Component({
  selector: 'author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent implements OnInit {

  showButton = false;
  @Input('author-data')
  data!: AuthorCardData;

  @Input('alternative-style')
  altStyle = false

  constructor(private currentUserService: CurrentUserDataService,
              private userService: UserService) {

  }

  ngOnInit(): void {
    this.currentUserService.getUserObservable().subscribe(user => {
      if (user) {
        this.showButton = user.id != this.data.id;
      } else {
        this.showButton = false;
      }
    });
  }

  subscribe() {
    this.userService.subscribe(this.data.id).subscribe(
      data => {
        this.data.isFollowing = !this.data.isFollowing
      },
      error => {
        console.error(error);
      }
    );
  }
}
