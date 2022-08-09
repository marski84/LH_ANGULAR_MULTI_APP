import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectPropertyGetter',
})
export class ObjectPropertyGetterPipe implements PipeTransform {
  transform(object: { name: string }, keyName: string): string {
    console.log(object[keyName as keyof object]);
    return object[keyName as keyof object];
  }
}
