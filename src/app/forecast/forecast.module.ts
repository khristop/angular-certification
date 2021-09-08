import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationForecastRoutesModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast/forecast.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, LocationForecastRoutesModule, SharedModule],
  declarations: [ForecastComponent]
})
export class ForecastModule {}
