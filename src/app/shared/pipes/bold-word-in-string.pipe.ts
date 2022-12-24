import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldWordInString'
})
export class BoldWordInStringPipe implements PipeTransform {

  transform(phrase: string, word: string): string {
    return phrase.replace(word, `<strong>${word}</strong>`);
  }

}
