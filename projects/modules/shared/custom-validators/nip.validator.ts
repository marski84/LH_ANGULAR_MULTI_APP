import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateNip(control: AbstractControl): ValidationErrors | null {
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const nip = control.value;

  //new Validatora do długości
  if (nip.length < 10) {
    return { nipNumberTooShort: true };
  }

  const nipAsArray: number[] = nip
    .split('')
    .map((value: string) => Number(value));

  const controlNumber = nipAsArray[nipAsArray.length - 1];

  const calculateIsNipValid =
    nipAsArray
      .slice(0, 9)
      .map((value, index) => {
        console.log(value, index);
        const sum = value * weights[index];
        return sum;
      })
      .reduce((acc, curr) => (acc += curr)) % 11;

  if (controlNumber !== calculateIsNipValid) {
    return { invalidNipNumber: true };
  }

  return null;
}

// feature module => campaingGeneratorModule
// campaingGeneratorModule => sharedModule
