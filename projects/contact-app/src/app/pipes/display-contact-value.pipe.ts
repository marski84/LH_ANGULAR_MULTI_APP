import { Pipe, PipeTransform } from '@angular/core';
import { contactType } from '../models/ContactType.enum';

// rename: display contact value
@Pipe({
  name: 'DispalyContactValue',
})
export class DispalyContactValue implements PipeTransform {
  transform(value: contactType) {
    // rozbić na 2 pipe'ydl
    // bezpieczny switcha
    switch (value) {
      case contactType.adress:
        return 'Adress';
      case contactType.phone:
        return 'Phone';
      case contactType.email:
        return 'Email';
      default:
        const exhaustCheck: never = value;
        return;
    }
  }
}
