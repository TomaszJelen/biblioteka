import { Pipe, PipeTransform } from '@angular/core';
import { Ksiazka } from './ksiazka-table/ksiazka-table.component';

@Pipe({
  name: 'ksiazki',
  standalone: true
})
export class KsiazkiPipe implements PipeTransform {

  transform(value: Ksiazka[]): unknown {
    return value.map((k) => k.nazwa);
  }

}
