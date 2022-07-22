import { Pipe, PipeTransform } from '@angular/core';
import { contactType } from './models/ContactType.enum';
import { contactTypeActionHandle } from './models/contactTypeActionHandle.enum.';
import { contactTypeViewValue } from './models/ContactTypeViewValue.enum';

@Pipe({
  name: 'viewValue',
})
export class ViewValuePipe implements PipeTransform {
  transform(value: string, isSelectView: boolean) {
    if (isSelectView) {
      switch (value) {
        case contactType.adress:
          return contactTypeViewValue.postViewValue;
        case contactType.phone:
          return contactTypeViewValue.phoneViewValue;
        case contactType.email:
          return contactTypeViewValue.emailViewValue;
      }
    }
    switch (value) {
      case contactType.adress:
        return contactTypeActionHandle.postAdres;
      case contactType.phone:
        return contactTypeActionHandle.phone;
      case contactType.email:
        return contactTypeActionHandle.email;
      default:
        return;
    }
  }
}
