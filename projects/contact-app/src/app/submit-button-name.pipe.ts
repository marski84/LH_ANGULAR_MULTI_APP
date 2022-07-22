import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './models/Contact';
import { ButtonText } from './models/ButtonText.enum';

@Pipe({
  name: 'submitButtonName',
})
export class SubmitButtonNamePipe implements PipeTransform {
  transform(value: Contact | undefined): unknown {
    console.log(value);
    if (value === undefined) {
      return ButtonText.submit;
    }
    return ButtonText.edit;

    return null;
  }
}
