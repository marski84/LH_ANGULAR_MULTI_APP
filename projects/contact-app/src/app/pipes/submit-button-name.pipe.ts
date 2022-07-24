import { Pipe, PipeTransform } from '@angular/core';
import { ButtonText } from '../models/ButtonText.enum';
import { Contact } from '../models/Contact';

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
