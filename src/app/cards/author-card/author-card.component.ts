import {Component, Input, OnInit} from '@angular/core';
import {RecommendationListType} from "../../enums/RecommendationListType";
import {AuthorCardData} from "../../interfaces/user/AuthorCardData";

@Component({
  selector: 'author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent implements OnInit {

  @Input('author-data')
  data: AuthorCardData = {
    id: "sdfsdf-sdfsdfsd-sdfsdf",
    userName: "Uname",
    description: "Опис профілю. Дуже цікавий профіль, власник якого робить огляди на ігри.",
    photo: "https://wallpapercave.com/uwp/uwp935605.png"
  }

  @Input('alternative-style')
  altStyle = false

  constructor() { }

  ngOnInit(): void {
  }
}
