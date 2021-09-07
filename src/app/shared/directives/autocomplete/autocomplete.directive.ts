import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit {
  @Input() appAutocomplete: AutocompleteComponent;

  constructor(
    public host: ElementRef<HTMLInputElement>,
  ) { }

  ngOnInit() {
    fromEvent(this.host.nativeElement, 'focus').subscribe(() => {
      this.appAutocomplete.openDropdown();
    });

    fromEvent<MouseEvent>(document, 'click')
      .pipe(filter(event => event.target !== this.host.nativeElement))
    .subscribe(() => this.appAutocomplete.closeDropdown());
  }
}
