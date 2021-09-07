import { Directive, Input } from '@angular/core';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';

@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective {
  @Input() appAutocomplete: AutocompleteComponent;
}
