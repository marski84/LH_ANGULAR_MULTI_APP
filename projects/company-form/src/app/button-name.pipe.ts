import { Pipe, PipeTransform } from '@angular/core';
import { Company } from './models/Company';

@Pipe({
  name: 'buttonName',
})
export class ButtonNamePipe implements PipeTransform {
  transform(value: Company | undefined): string {
    if (value === undefined) {
      return 'Submit';
    }
    return 'Edit data';
  }
}
