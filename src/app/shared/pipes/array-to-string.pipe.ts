import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {

  transform(value: string[] | number): string {
    if (typeof value === 'number') {
      return String(value);
    } else if (typeof value === 'string') {
      return value;
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
