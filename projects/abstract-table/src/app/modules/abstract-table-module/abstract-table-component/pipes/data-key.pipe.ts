import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataKey',
})
export class DataKeyPipe implements PipeTransform {
  transform(object: any, keyName: string, ...args: unknown[]): any {
    console.log(object[keyName], 'zmiana wartości');

    return object[keyName];
  }
}
