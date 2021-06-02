import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'punktZuKomma',
})
export class PunktZuKommaPipe implements PipeTransform {
  transform(value: any): string {
    return value.toString().replace(/\./g, ',');
  }
}
