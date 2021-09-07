import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-autocomplete-option',
  templateUrl: './autocomplete-option.component.html',
  styleUrls: ['./autocomplete-option.component.scss']
})
export class AutocompleteOptionComponent implements OnInit {
  @Input() value: string;

  constructor() { }

  ngOnInit(): void {
  }

}
