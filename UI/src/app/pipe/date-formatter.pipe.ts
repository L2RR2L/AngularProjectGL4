import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true,
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: Date | string | number, format: string = 'dd/MM/yyyy'): string {
    if (!value) return '';



    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }
}
