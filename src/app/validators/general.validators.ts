import {AbstractControl, ValidationErrors} from "@angular/forms";

export class GeneralValidators {
  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
    if ((control.value as string).indexOf(' ') != -1)
      return { 'can-not-contain-space': true }

    return null;
  }
}
