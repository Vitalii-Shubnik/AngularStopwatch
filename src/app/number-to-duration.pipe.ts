import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToDuration'
})
export class NumberToDurationPipe implements PipeTransform {
  transform(value: number): string {
    return ((value / 60) < 10 ? '0' + Math.floor(value / 60) : Math.ceil(value / 60)) +
      ': ' + ((value % 60) < 10 ? '0' + value % 60 : value % 60);
  }
}
