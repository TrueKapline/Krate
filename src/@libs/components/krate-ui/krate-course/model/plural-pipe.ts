import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
  standalone: true
})
export class PluralizePipe implements PipeTransform {
  transform(count: number, singular: string, plural: string, few: string): string {
    if (isNaN(count)) return '';

    const absCount = Math.abs(count);
    const lastTwo = absCount % 100;

    if (lastTwo >= 11 && lastTwo <= 14) {
      return plural;
    }

    const last = absCount % 10;

    switch (last) {
      case 1:
        return singular;
      case 4:
        return few;
      default:
        return plural;
    }
  }
}
