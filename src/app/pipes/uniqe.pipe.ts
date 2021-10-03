import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqe'
})
export class UniqePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
      const prop: string = args[0] as string;

      const array =  [...(value as any[])].map(obj => obj[`${prop}`]).filter((item, i, ar) => ar.indexOf(item) === i);

      return array;
    }
  }
