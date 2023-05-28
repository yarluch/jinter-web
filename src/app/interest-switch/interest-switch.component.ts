import {Component, OnInit} from '@angular/core';
import {Interest} from "../types/types";
import {InterestControllerService} from "../services/interest-controller.service";
import {ContentVisibilityControllerService} from "../services/content-visibility-controller.service";

@Component({
  selector: 'interest-switch',
  templateUrl: './interest-switch.component.html',
  styleUrls: ['./interest-switch.component.css']
})
export class InterestSwitchComponent implements OnInit {
  isSwitcherActive = false;
  currentInterest!: Interest;

  constructor(private interestControllerService: InterestControllerService,
              private visibilityControllerService: ContentVisibilityControllerService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest => this.currentInterest = interest)
  }

  ngOnInit(): void {
  }

  changeSwitcherState() {
    this.isSwitcherActive = !this.isSwitcherActive;
    this.visibilityControllerService.setIsBlackoutActive(this.isSwitcherActive);
  }


  changeInterest(interest: Interest) {
    this.changeSwitcherState();
    this.interestControllerService.changePageInterest(interest);
  }
}
