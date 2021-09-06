import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList, TemplateRef } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
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
export class StativeButtonComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(ButtonStateDirective) stateTemplatesList: QueryList<ButtonStateDirective>;

  @Input() resetTime = 3000;
  @Input() timerEnable = true;
  
  timerSubscription : Subscription;

  currentState$ = new BehaviorSubject<ButtonStates>('initial');
  stateTemplates = {} as ButtonStateContent<ButtonStates> ;

  @Output() buttonClicked = new EventEmitter<MouseEvent>();

  ngAfterContentInit() {
    this.stateTemplatesList.forEach(i => this.stateTemplates[i.stepId] = i.templateRef);
  }

  ngOnDestroy() {
    if(this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  proccess(event: MouseEvent) {
    if (this.currentState$.getValue() === 'complete') {
      this.currentState$.next('initial');
      this.timerSubscription.unsubscribe();
    } else {
      this.currentState$.next('working');
      this.buttonClicked.emit(event);
    }
  }

  finish() {
    this.currentState$.next('complete');
    this.timerSubscription = this.timerEnable && timer(this.resetTime).subscribe(
      () => this.currentState$.next('initial'));
  }
}
