import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContentVisibilityControllerService} from "../../services/content-visibility-controller.service";
import {environment} from "../../../environments/environment.prod";
import {GeneralValidators} from "../../validators/general.validators";
import {PasswordValidators} from "../../validators/password.validators";
import {UsernameValidators} from "../../validators/username.validators";
import {EmailValidators} from "../../validators/email.validators";
import {AgeValidators} from "../../validators/age.validators";
import {AuthenticationService} from "../../services/api/authentication.service";
import {CurrentUserDataService} from "../../services/current-user-data.service";
import {LoginModel} from "../../interfaces/user/loginModel";
import {RegisterDTO} from "../../interfaces/user/registerDTO";

@Component({
  selector: 'login-sign-up-modal',
  templateUrl: './login-sign-up-modal.component.html',
  styleUrls: ['./login-sign-up-modal.component.css'],
  host: {
    '[class.top]': 'isModalTop',
    '[class.active]': 'isModalActive'
  }
})
export class LoginSignUpModalComponent implements OnInit {
  isModalTop = false;
  isModalActive = false;
  state: string = '';

  passwordControl = new FormControl('');
  passwordConfirmationControl = new FormControl('', [
    Validators.required,
    PasswordValidators.passwordsNotMatches(this.passwordControl)
  ]);

  form = new FormGroup({
    'username': new FormControl(''),
    'password': this.passwordControl,
    'password-confirmation': this.passwordConfirmationControl,
    'email': new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    'date-of-birth': new FormControl('', [
      Validators.required,
      AgeValidators.shouldBeOlder13
    ]),
    'sex': new FormControl('0', Validators.required)
  });

  isPasswordVisible: boolean = false;
  isPasswordConfVisible: boolean = false;

  constructor(private visibilityControllerService: ContentVisibilityControllerService,
              private usernameValidators: UsernameValidators,
              private emailValidators: EmailValidators,
              private authService: AuthenticationService,
              private userDataService: CurrentUserDataService) {
    visibilityControllerService.getLoginSingUpState().subscribe(async state => {
      this.state = state;

      if (state === environment.LOGIN || state === environment.SIGN_UP) {
        this.isModalTop = true;
        this.isModalActive = true;
      } else {
        this.isModalActive = false;
        await new Promise(resolve => setTimeout(resolve, 400))
          .then(() => this.isModalTop = false);
      }

      this.setUsernameValidators();
      this.setPasswordValidators();
      this.setEmailValidators();


    });
  }

  ngOnInit(): void {
  }

  setUsernameValidators() {
    this.form.get('username')?.clearValidators();
    this.form.get('username')?.clearAsyncValidators();

    if (this.state === environment.LOGIN) {
      this.form.get('username')?.addAsyncValidators([this.usernameValidators.mustExist]);
      this.form.get('username')?.addValidators([Validators.required]);
    }

    if (this.state === environment.SIGN_UP) {
      this.form.get('username')?.addAsyncValidators([this.usernameValidators.shouldBeUnique]);
      this.form.get('username')?.addValidators([
        Validators.required,
        GeneralValidators.cannotContainSpace
      ]);
    }

    this.form.get('username')?.updateValueAndValidity();
  }

  setPasswordValidators() {
    this.form.get('password')?.clearValidators();

    if (this.state === environment.LOGIN) {
      this.form.get('password')?.addValidators([Validators.required]);
    }

    if (this.state === environment.SIGN_UP) {
      this.form.get('password')?.addValidators([
        Validators.required,
        GeneralValidators.cannotContainSpace,
        Validators.minLength(8),
        PasswordValidators.notAllRequiredSymbols
      ]);
    }

    this.form.get('password')?.updateValueAndValidity();
  }

  setEmailValidators() {
    if (this.state === environment.SIGN_UP) {
      this.form.get('email')?.clearAsyncValidators();
      this.form.get('email')?.addAsyncValidators([this.emailValidators.shouldBeUnique]);
      this.form.get('email')?.updateValueAndValidity();
    }
  }

  changePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  changePasswordConfVisibility() {
    this.isPasswordConfVisible = !this.isPasswordConfVisible;
  }

  isEmailInvalid() {
    return this.form.get('email')?.touched && this.form.get('email')?.invalid;
  }

  isUsernameInvalid() {
    return this.form.get('username')?.touched && this.form.get('username')?.invalid;
  }

  isPasswordInvalid() {
    return this.form.get('password')?.touched &&
      this.form.get('password')?.invalid;
  }

  isPasswordConfInvalid() {
    return this.form.get('password-confirmation')?.touched &&
      this.form.get('password-confirmation')?.invalid;
  }

  isDateOfBirthInvalid() {
    return this.form.get('date-of-birth')?.touched && this.form.get('date-of-birth')?.invalid;
  }

  closeForm() {
    this.visibilityControllerService.setLoginSingUpState('');
  }

  resetFormFields() {
    this.form.reset();
    this.form.get('sex')?.setValue('0');
  }

  login() {
    let user = {
      "userName": this.form.get('username')?.value ?? '',
      "password": this.form.get('password')?.value ?? ''
    }

    this.authService.login(user).subscribe(
      data => {
        this.userDataService.setUserData(data);
        this.closeForm();
        this.resetFormFields();
      },
      error => {
        alert('Incorrect password');
      }
    );
  }

  signUp() {
    let sexString = this.form.get('sex')?.value ?? "0";

    let birthdayString = this.form.get('date-of-birth')?.value ?? "";

    let user: RegisterDTO = {
      userName: this.form.get('username')?.value ?? '',
      password: this.form.get('password')?.value ?? '',
      email: this.form.get('email')?.value ?? '',
      sex: +sexString,
      birthday: new Date(birthdayString),
      description: ''
    }

    this.authService.register(user).subscribe(
      data => {
        this.userDataService.setUserData(<LoginModel>data);
        this.closeForm();
        this.resetFormFields();
      },
      error => {
        alert('Error occurred');
      }
    );
  }

  changeFormState(state: string) {
    this.visibilityControllerService.setLoginSingUpState(state);
  }

  updatePasswordConfValidators() {
    this.form.get('password-confirmation')?.updateValueAndValidity();
  }

  protected readonly environment = environment;

  arePasswordsMatch() {
    return this.form.get('password')?.value == this.form.get('password-confirmation')?.value;
  }
}
