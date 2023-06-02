import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";

export class PasswordValidators {
  static notAllRequiredSymbols(control: AbstractControl) : ValidationErrors | null {
    if (control.value.length < 8)
      return null;

    let regexp = new RegExp("^" +
      "(?=.*[0-9])" +         //at least 1 digit
      "(?=.*[a-z])" +         //at least 1 lower case letter
      "(?=.*[A-Z])" +         //at least 1 upper case letter
      "(?=.*[a-zA-Z])" +      //any letter
      "(?=.*[@#$%^&+=])" +    //at least 1 special character
      ".{8,}" +               //at least 8 characters
      "$")

    let isCorrect = regexp.test(control.value);

    return isCorrect ? null : { 'not-all-required-symbols': true }
  }

  static passwordsNotMatches(password: FormControl): {(control: AbstractControl): ValidationErrors | null}{
    return (control: AbstractControl): ValidationErrors | null => {

      return password.value == control.value ? null : { 'passwords-not-matches': true}

      /*let v: number = +control.value;
      if (isNaN(v)) {
        return { 'gte': true, 'requiredValue': val }
      }
      if (v <= +val) {
        return { 'gte': true, 'requiredValue': val }
      }

      return null;*/

    }

  }
}
