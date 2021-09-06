import { Directive, Input, TemplateRef } from '@angular/core';
import { ButtonStates } from '../../components/stative-button/stative-button.model';

@Directive({
  selector: '[appButtonState]'
})
export class ButtonStateDirective {
  @Input('appButtonState') stepId: ButtonStates;

  constructor(public templateRef: TemplateRef<unknown>) {
  }
}
