import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Interest} from "../types/types";
import {LocalStorageDataService} from "../services/local-storage-data.service";

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

  constructor(private storageService: LocalStorageDataService) {
    storageService.getCurrentInterestObserver().subscribe(interest => this.currentInterest = interest)
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
