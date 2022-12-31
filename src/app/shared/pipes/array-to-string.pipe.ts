import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {

  transform(value: string[] | number | undefined): string {
    if (typeof value === 'number') {
      return String(value);
    } else if (typeof value === 'string') {
      return value;
    } else if (value === undefined) {
      return '';
    } else {
      let arrayToString = '';
      value.forEach((v, i) => {
        if (i === 0) {
          arrayToString = v;
        } else {
          arrayToString = arrayToString + ', ' + v;
        }
      })
      return arrayToString;
    }
  }

}
