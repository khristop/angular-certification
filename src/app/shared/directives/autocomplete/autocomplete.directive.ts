import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { filter, map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit, OnDestroy {
  @Input() appAutocomplete: AutocompleteComponent;
  killSubscriptions$ = new Subject();
  previousValue: string;

  constructor(
    public host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl
  ) {
    (host.nativeElement as HTMLElement).setAttribute('autocomplete', 'off');
  }

  ngOnInit() {
    fromEvent(this.host.nativeElement, 'focus')
      .pipe(
        tap(() => {
          if(this.ngControl.control.value) {
            this.previousValue = this.ngControl.control.value;
            this.ngControl.control.setValue('');
          }
        }),
        takeUntil(this.killSubscriptions$))
      .subscribe(() => {
        this.appAutocomplete.openDropdown();
        this.appAutocomplete.optionsClick()
        .pipe(
          takeWhile(() => this.appAutocomplete.showDropdown$.getValue())
        )
        .subscribe(( value: string ) => {
          this.ngControl.control.setValue(value);
          this.appAutocomplete.closeDropdown();
        });
      });

    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        takeUntil(this.killSubscriptions$),
        filter(event => {
          const optionClicked = (this.appAutocomplete.host.nativeElement as HTMLElement)
            .contains(event.target as HTMLElement);
          return event.target !== this.host.nativeElement && !optionClicked;
        }))
      .subscribe(() => {
        if(!this.ngControl.value && this.previousValue) {
          this.ngControl.control.setValue(this.previousValue);
        }
        this.appAutocomplete.closeDropdown();
      });
  }

  ngOnDestroy(): void {
    this.killSubscriptions$.next();
    this.killSubscriptions$.complete();
  }
}
