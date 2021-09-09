import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'emphasize'
})
export class EmphasizePipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(value: string, lookupValue: string): SafeHtml {
    return lookupValue  ? this.sanitize(this.replace(value, lookupValue)) : value;
  }

  replace(value: string, lookupValue: string) {
    return value.replace(new RegExp(`(${lookupValue.trim()})`, 'gi'), '<b>$1</b>');
  }

  sanitize(value: string) {
    return this.sanitizer.sanitize(1, value);
  }
}
