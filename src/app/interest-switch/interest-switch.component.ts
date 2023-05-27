import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Interest} from "../types/types";
import {InterestControllerService} from "../services/interest-controller.service";

@Component({
  selector: 'interest-switch',
  templateUrl: './interest-switch.component.html',
  styleUrls: ['./interest-switch.component.css']
})
export class InterestSwitchComponent implements OnInit {
  isSwitcherActive = false;
  currentInterest!: Interest;

  @Output('interest-changer')
  changeInterestEmitter = new EventEmitter(true)

  @Output('content-hider')
  changeContentVisibility = new EventEmitter()

  constructor(private interestControllerService: InterestControllerService) {
    interestControllerService.getCurrentInterestObserver().subscribe(interest => this.currentInterest = interest)
  }

  ngOnInit(): void {
  }

  changeSwitcherState() {
    this.changeContentVisibility.emit();
    this.isSwitcherActive = !this.isSwitcherActive;
  }


  changeInterest(interest: Interest) {
    this.changeSwitcherState();
    this.changeInterestEmitter.emit(interest);
  }
}
