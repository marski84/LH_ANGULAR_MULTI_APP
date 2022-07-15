import { Pipe, PipeTransform } from '@angular/core';
import { contactType, contactTypeViewValue } from './models/IselectType';

@Pipe({
  name: 'viewValue',
})
export class ViewValuePipe implements PipeTransform {
  transform(value: string) {
    console.log(value);
    switch (value) {
      case contactType.adress:
        return contactTypeViewValue.postViewValue;
      case contactType.phone:
        return contactTypeViewValue.phoneViewValue;
      case contactType.email:
        return contactTypeViewValue.emailViewValue;
      default:
        return;
    }
  }
}
