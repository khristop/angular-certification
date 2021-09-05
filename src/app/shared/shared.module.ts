import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MeasureUnitPipe } from "./pipes/measure-unit.pipe";
import { GetDatePipe } from "./pipes/get-date.pipe";

const pipes = [MeasureUnitPipe, GetDatePipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...pipes],
  exports: [...pipes]
})
export class SharedModule {}
