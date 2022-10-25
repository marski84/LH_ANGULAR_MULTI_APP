import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataKey',
})
export class DataKeyPipe implements PipeTransform {
  transform(object: any, keyName: string): string {
    return object[keyName];
  }
}
