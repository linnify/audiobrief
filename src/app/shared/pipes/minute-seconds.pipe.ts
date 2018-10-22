import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const integer = Math.round(value);
    const minutes: number = Math.floor(integer / 60);
    return minutes.toString().padStart(1, '0') + ':' +
      (integer - minutes * 60).toString().padStart(2, '0');
  }
}
