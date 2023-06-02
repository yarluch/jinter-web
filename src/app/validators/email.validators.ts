import {Injectable} from "@angular/core";
import {AbstractControl, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {AuthenticationService} from "../services/api/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class EmailValidators {
  constructor(private authService: AuthenticationService) {
  }
  shouldBeUnique = (control: AbstractControl) : Observable<ValidationErrors | null> => {
    return this.authService.isEmailExists(control.value)
      .pipe(map((value: boolean) => {
        return value ? {"email-used": true} : null;
      }));
  }
}
