import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MeasureUnitPipe } from "./pipes/measure-unit.pipe";
import { GetDatePipe } from "./pipes/get-date.pipe";
import { StativeButtonComponent } from './components/stative-button/stative-button.component';
import { ButtonStateDirective } from "./directives/button-state/button-state.directive";

const pipes = [MeasureUnitPipe, GetDatePipe];
const components = [StativeButtonComponent];
const directives = [ButtonStateDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...pipes, ...components, ...directives],
  exports: [...pipes]
})
export class SharedModule {}
