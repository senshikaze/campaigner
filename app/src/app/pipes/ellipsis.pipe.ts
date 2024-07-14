import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  /**
   * 
   * @param value string to shorten
   * @param args args[0] how many characters to truncate to
   * @returns 
   */
  transform(value: string, ...args: number[]): string {
    let count = args[0] || 50;
    return (value.length < count) ? value : value.slice(0, count) + '...';
  }

}
