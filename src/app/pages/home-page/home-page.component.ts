import {Component, HostBinding, OnInit} from '@angular/core';
import {SliderItemSize} from "../../enums/SliderItemSize";
import {ActivatedRoute, Router} from "@angular/router";
import {InterestControllerService} from "../../services/interest-controller.service";
import {Location} from "@angular/common";
import {InterestCardData} from "../../interfaces/InterestCardData";
import {InterestService} from "../../services/api/interest.service";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  popularInterests: Array<InterestCardData> = [];

  protected readonly SliderSizeSmall = SliderItemSize.SMALL;
  protected readonly SliderSizeMedium = SliderItemSize.MEDIUM;
  protected readonly SliderSizeBig = SliderItemSize.BIG;

  @HostBinding('class') class!: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private interestControllerService: InterestControllerService,
              private interestService: InterestService) {
    this.class = "main-content-wrapper"

    this.interestService.getPopular().subscribe(
      data => {
        this.popularInterests = data
      },
      error => {
        alert('Error occurred');
      }
    );
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params)
    })
  }
}
