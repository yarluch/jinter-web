import {Component, Input, OnInit} from '@angular/core';
import {InterestCardData} from "../../interfaces/InterestCardData";

@Component({
  selector: 'interest-card',
  templateUrl: './interest-card.component.html',
  styleUrls: ['./interest-card.component.css']
})
export class InterestCardComponent implements OnInit {

  alternativePhoto: string = 'https://assets-prd.ignimgs.com/2020/09/29/genshin-impact-button-fin-1601346152039.jpg'

  @Input('interest-data')
  data: InterestCardData = {
    id: '',
    name: 'Genshin Impact',
    description: 'Genshin Impact — відеогра жанру Action/RPG з відкритим світом, розроблена китайською компанією miHoYo Limited. Гра розповсюджується цифровою дистрибуцією за моделлю free-to-play. Основа «Genshin Impact» — це «ґача-гра», система колекціонування та розвитку персонажів, які випадають з різною ймовірністю.',
    mainPhotoUrl: 'https://assets-prd.ignimgs.com/2020/09/29/genshin-impact-button-fin-1601346152039.jpg'
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
