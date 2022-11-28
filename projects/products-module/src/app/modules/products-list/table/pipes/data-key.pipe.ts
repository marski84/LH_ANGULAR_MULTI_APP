import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataKey',
})
export class DataKeyPipe implements PipeTransform {
  transform(object: any, keyName: string): string {
    // if (keyName === 'rating') {
    //   const rating = object[keyName];
    //   console.log(object[keyName]);
    //   object.rating = JSON.stringify(rating);
    //   console.log(object);

    //   object[keyName];
    // }

    return object[keyName];
  }
}
