import { Pipe, PipeTransform } from '@angular/core';
import { contactType } from '../models/ContactType.enum';

@Pipe({
  name: 'MessageDisplayValue',
})
export class MessageDisplayValuePipe implements PipeTransform {
  transform(value: contactType) {
    switch (value) {
      case contactType.adress:
        return 'Copy adress to clipboard';
      case contactType.phone:
        return 'Make a call';
      case contactType.email:
        return 'Send email';
      default:
        const exhaustCheck: never = value;
        return;
    }
  }
}
