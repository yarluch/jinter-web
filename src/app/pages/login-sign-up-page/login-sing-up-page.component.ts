import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'login-sign-up-page',
  templateUrl: './login-sing-up-page.component.html',
  styleUrls: ['./login-sing-up-page.component.css']
})
export class LoginSingUpPageComponent implements OnInit {
  isFormSignUp: boolean = false;

  constructor(private router: Router) {
    this.isFormSignUp = this.router.url !== '/login'
  }

  ngOnInit(): void {
  }

}
