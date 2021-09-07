import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-autocomplete-option',
  templateUrl: './autocomplete-option.component.html',
  styleUrls: ['./autocomplete-option.component.scss']
})
export class AutocompleteOptionComponent {
  @Input() value: string;
  click$ = new Subject();
}
