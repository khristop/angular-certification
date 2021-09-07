import { Component, ContentChildren, QueryList } from '@angular/core';
import { AutocompleteOptionComponent } from '../autocomplete-option/autocomplete-option.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'autocomplete'
})
export class AutocompleteComponent {
  @ContentChildren(AutocompleteOptionComponent) optionsRef: QueryList<AutocompleteOptionComponent>;
}
