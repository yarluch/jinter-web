import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Interest} from "../../types/types";
import {Location} from "@angular/common";
import {InterestControllerService} from "../../services/interest-controller.service";


@Component({
  selector: 'interest-page',
  templateUrl: './interest-page.component.html',
  styleUrls: ['./interest-page.component.css']
})
export class InterestPageComponent implements OnInit {

  @HostBinding('class') class!: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private interestControllerService: InterestControllerService) {
    this.class = "main-content-wrapper"
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params)
    })
  }

  setRedirection(params: Params) {
    if (<Interest>params['interest-type'] != this.interestControllerService.getCurrentInterest()) {
      this.interestControllerService.saveCurrentInterest(<Interest>params['interest-type']);
    }
  }

}
