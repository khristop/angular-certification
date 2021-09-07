import { Component, ContentChild, ContentChildren, ElementRef, QueryList } from '@angular/core';
import { BehaviorSubject, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AutocompleteContentDirective } from '../../directives/autocomplete/autocomplete-content.directive';
import { AutocompleteOptionComponent } from '../autocomplete-option/autocomplete-option.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'autocomplete'
})
export class AutocompleteComponent {
  @ContentChildren(AutocompleteOptionComponent) optionsRef: QueryList<AutocompleteOptionComponent>;
  @ContentChild(AutocompleteContentDirective) autocompleteContent: AutocompleteContentDirective;

  showDropdown$ = new BehaviorSubject(false);

  constructor(public host: ElementRef) {}

  openDropdown() {
    this.showDropdown$.next(true);
  }

  closeDropdown() {
    this.showDropdown$.next(false);
  }

  optionsClick() {
    return this.optionsRef.changes.pipe(
      switchMap(options =>  merge(...options.map(option => option.click$)))
    );
  }
}
