import { AfterContentInit, Component, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ButtonStateDirective } from '../../directives/button-state/button-state.directive';
import { ButtonStates } from './stative-button.model';

export type ButtonStateContent<AvailableStates> = {
  [state in keyof AvailableStates]: TemplateRef<HTMLElement>
}

@Component({
  selector: 'app-stative-button',
  templateUrl: './stative-button.component.html',
  styleUrls: ['./stative-button.component.scss']
})
export class StativeButtonComponent implements AfterContentInit {

  @ContentChildren(ButtonStateDirective) stateTemplatesList: QueryList<ButtonStateDirective>;

  currentState$ = new BehaviorSubject<ButtonStates>('initial');
  stateTemplates: ButtonStateContent<ButtonStates>;

  ngAfterContentInit() {
    this.stateTemplatesList.forEach(i => this.stateTemplates[i.stepId] = i.templateRef);
  }
}
