import { Pipe, PipeTransform } from '@angular/core';
import { IselectType } from './custom-mat-select.component';

@Pipe({
  name: 'viewValuePipe',
})
export class ViewValuePipePipe implements PipeTransform {
  transform(value: string, selecteValuesArray: IselectType[]) {
    const selectedValue = selecteValuesArray.find((selectValueObj) => {
      if (selectValueObj.value === value) {
        return selectValueObj;
      }
      return;
    });

    return selectedValue?.viewValue;
  }
}
