import { AbstractControl, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export function validarData(
  birthDate: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const controlBirthDate = control.get(birthDate);

    const diff = moment().diff(moment(controlBirthDate?.value), 'years');

    if(diff && diff >= 18) {
      controlBirthDate?.setErrors(null);
      return null
    }else{
      controlBirthDate?.setErrors({ dateValidator: true });
      return { dateValidator: true };
    }
  };
}
