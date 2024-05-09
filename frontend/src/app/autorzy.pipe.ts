import { Pipe, PipeTransform } from '@angular/core';
import { Autor } from './autor-table/autor-table.component';

@Pipe({
  name: 'autorzy',
  standalone: true
})
export class AutorzyPipe implements PipeTransform {

  transform(value: Autor[]): unknown {
    return value.map((a) => a.imie + " " + a.nazwisko);
  }

}
