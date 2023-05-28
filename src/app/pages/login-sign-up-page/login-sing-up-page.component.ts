import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ContentVisibilityControllerService} from "../../services/content-visibility-controller.service";

@Component({
  selector: 'login-sign-up-page',
  templateUrl: './login-sing-up-page.component.html',
  styleUrls: ['./login-sing-up-page.component.css']
})
export class LoginSingUpPageComponent implements OnInit, OnDestroy {
  isFormSignUp: boolean = false;

  constructor(private router: Router,
              private visibilityControllerService: ContentVisibilityControllerService) {
    visibilityControllerService.setIsInterfaceVisible(false);
    this.isFormSignUp = this.router.url !== '/login'
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.visibilityControllerService.setIsInterfaceVisible(true);
  }
}
