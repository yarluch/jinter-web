import {AbstractControl, ValidationErrors} from "@angular/forms";
import {AuthenticationService} from "../services/api/authentication.service";
import {map, Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UsernameValidators {

  constructor(private authService: AuthenticationService) {
  }
  shouldBeUnique = (control: AbstractControl) : Observable<ValidationErrors | null> => {
    return this.authService.isUsernameExists(control.value)
      .pipe(map((value: boolean) => {
        return value ? {"username-taken": true} : null;
      }));
  }

  mustExist = (control: AbstractControl) : Observable<ValidationErrors | null> => {
    return this.authService.isUsernameExists(control.value)
      .pipe(map((value: boolean) => {
        return value ? null : {"username-not-exists": true};
      }));
  }
}
