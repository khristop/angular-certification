import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appButtonState]'
})
export class ButtonStateDirective {
  @Input('appButtonState') stepId: string;

  constructor(public templateRef: TemplateRef<unknown>) {
  }
}
