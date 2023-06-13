import { Component, OnInit } from '@angular/core';
import {InterestControllerService} from "../../services/interest-controller.service";
import {Interest} from "../../types/types";

@Component({
  selector: 'not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {
  currentInterest!: Interest;

  constructor(private interestControllerService: InterestControllerService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest =>
      this.currentInterest = interest
    );
  }

  ngOnInit(): void {
    console.error('hi not found');
  }

}
