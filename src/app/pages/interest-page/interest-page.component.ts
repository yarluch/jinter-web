import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Interest} from "../../types/types";
import {Location} from "@angular/common";
import {LocalStorageDataService} from "../../services/local-storage-data.service";

@Component({
  selector: 'interest-page',
  templateUrl: './interest-page.component.html',
  styleUrls: ['./interest-page.component.css']
})
export class InterestPageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private location: Location,
              private storageService: LocalStorageDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setRedirection(params)
    })
  }

  setRedirection(params: Params) {
    let isRedirected = false
    if (<Interest>params['interest-type'] != this.storageService.getCurrentInterest()) {
      this.storageService.saveCurrentInterest(<Interest>params['interest-type']);
    }
    this.storageService.getCurrentInterestObserver().subscribe(interest =>{
      if (!isRedirected &&
        <Interest>params['interest-type'] != this.storageService.getCurrentInterest()) {
        console.error("interest " + interest)
        isRedirected = true;
        this.router.navigate([`/${interest}`])
      }
    });
  }

}
