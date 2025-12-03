import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) return '';
    return value.split('/').pop() ?? '';
  }

}
