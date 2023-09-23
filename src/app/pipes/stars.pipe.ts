import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (new Array(value)).fill(1);
  }

}
