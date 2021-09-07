import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MeasureUnitPipe } from "./pipes/measure-unit.pipe";
import { GetDatePipe } from "./pipes/get-date.pipe";
import { StativeButtonComponent } from './components/stative-button/stative-button.component';
import { ButtonStateDirective } from "./directives/button-state/button-state.directive";
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteOptionComponent } from './components/autocomplete-option/autocomplete-option.component';
import { AutocompleteDirective } from "./directives/autocomplete/autocomplete.directive";
import { AutocompleteContentDirective } from "./directives/autocomplete/autocomplete-content.directive";
import { EmphasizePipe } from "./pipes/emphasize.pipe";

const pipes = [MeasureUnitPipe, GetDatePipe, EmphasizePipe];
const components = [StativeButtonComponent, AutocompleteComponent, AutocompleteOptionComponent];
const directives = [ButtonStateDirective, AutocompleteDirective, AutocompleteContentDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...pipes, ...components, ...directives],
  exports: [...pipes, ...components, ...directives]
})
export class SharedModule {}
