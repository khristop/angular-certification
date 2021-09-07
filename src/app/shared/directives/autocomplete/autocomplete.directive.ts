import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit, OnDestroy {
  @Input() appAutocomplete: AutocompleteComponent;
  killSubscriptions$ = new Subject();

  constructor(
    public host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl
  ) { }

  ngOnInit() {
    fromEvent(this.host.nativeElement, 'focus')
      .pipe(takeUntil(this.killSubscriptions$))
      .subscribe(() => {
        this.appAutocomplete.openDropdown();
        this.appAutocomplete.optionsClick()
        .pipe(take(1))
        .subscribe(( value: string ) => {
          this.ngControl.control.setValue(value);
        });
      });

    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        takeUntil(this.killSubscriptions$),
        filter(event => event.target !== this.host.nativeElement))
      .subscribe(() => this.appAutocomplete.closeDropdown());
  }

  ngOnDestroy(): void {
    this.killSubscriptions$.next();
    this.killSubscriptions$.complete();
  }
}
