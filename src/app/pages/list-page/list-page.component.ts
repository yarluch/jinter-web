import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InterestControllerService} from "../../services/interest-controller.service";

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  @HostBinding('class') class = 'narrow-content-wrapper';


  constructor(private router: Router, private route: ActivatedRoute,
              private interestControllerService: InterestControllerService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.interestControllerService.configureLinkAccess(params);
    });
  }

}
