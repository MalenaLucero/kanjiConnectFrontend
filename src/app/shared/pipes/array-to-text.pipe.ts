import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToText'
})
export class ArrayToTextPipe implements PipeTransform {

  transform(value: string[]): string {
    if (value.length > 1) {
      const lastItem = value.pop();
      return value.join(', ') + ' and ' + lastItem;
    }
    return value[0];
  }

}
