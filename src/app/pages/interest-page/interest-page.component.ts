import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {InterestControllerService} from "../../services/interest-controller.service";
import {InterestPageData} from "../../interfaces/interest/interestPageData";
import {InterestService} from "../../services/api/interest.service";
import {SliderItemSize} from "../../enums/SliderItemSize";


@Component({
  selector: 'interest-page',
  templateUrl: './interest-page.component.html',
  styleUrls: ['./interest-page.component.css']
})
export class InterestPageComponent implements OnInit {

  @HostBinding('class') class!: string;

  interest = ''

  interestData!: InterestPageData

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private interestControllerService: InterestControllerService,
              private interestService: InterestService) {
    this.class = "main-content-wrapper"

    interestControllerService.getCurrentInterestObserver().subscribe(interest => {
      this.interest = interest
    });


  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params);

      this.interestService.getInterest(params["interestId"]).subscribe(
        interest => {
          this.interestData = interest;
        },
        error => {
          console.error(error);
        }
      );
    });


  }

  protected readonly MEDIUM_2 = SliderItemSize.MEDIUM_2;
}
