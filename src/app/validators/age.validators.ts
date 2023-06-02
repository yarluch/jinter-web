import {AbstractControl, ValidationErrors} from "@angular/forms";

export class AgeValidators {
  static shouldBeOlder13(control: AbstractControl) : ValidationErrors | null {
    let dateEntered = new Date(control.value);

    let dateToCompare = new Date()
    dateToCompare.setFullYear(dateToCompare.getFullYear() - 13);

    if (dateEntered > dateToCompare)
      return { 'younger-13': true }

    return null;
  }
}
