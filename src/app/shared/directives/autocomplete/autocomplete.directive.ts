import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil, takeWhile } from 'rxjs/operators';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';

export interface AutocompleteOptionData {
  search: string;
  selectedValue: string; 
}

@Directive({
  selector: '[appAutocomplete]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AutocompleteDirective,
    multi: true
  }]
})
export class AutocompleteDirective implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() appAutocomplete: AutocompleteComponent;
  @Input() displayWith : (_: unknown) => string;
  @Input() setValueBy : (_: unknown) => string;

  @HostListener('input', ['$event.target.value'])
  onInput(input: string) {
    this.onChange({search: input});
  };

  // control value accessor: Reference functions to update the model value
  private onChange = (_: unknown) => {};
  private onTouch = (_: unknown) => {};

  private _value: AutocompleteOptionData;

  killSubscriptions$ = new Subject();

  constructor(public host: ElementRef<HTMLInputElement>, private renderer: Renderer2) {
    (host.nativeElement as HTMLElement).setAttribute('autocomplete', 'off');
  }

  ngOnInit() {
    fromEvent(this.host.nativeElement, 'focus')
      .pipe(
        takeUntil(this.killSubscriptions$))
      .subscribe(() => {
        this.appAutocomplete.openDropdown();
        this.appAutocomplete.optionsClick()
        .pipe(
          takeWhile(() => this.appAutocomplete.showDropdown$.getValue())
        )
        .subscribe(( value: unknown ) => {
          const uiValue = this.displayWith ? this.displayWith(value) : value as string;
          const modelValue = this.setValueBy ? this.setValueBy(value) : value as string;

          this._value = { search: uiValue, selectedValue: modelValue};

          this.writeValue(this._value.search);
          this.onChange(this._value);
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
        this.appAutocomplete.closeDropdown();
      });
  }

  ngOnDestroy(): void {
    this.killSubscriptions$.next();
    this.killSubscriptions$.complete();
  }

  writeValue(newValue: string): void {
    this.renderer.setProperty(
      this.host.nativeElement,
      'value',
      newValue
    );
  }
  registerOnChange(fn: (_: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: unknown) => void): void {
    this.onTouch = fn;
  }
}
