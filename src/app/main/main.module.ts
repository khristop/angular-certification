import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainRoutesModule } from "./main-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { WeatherContainerComponent } from "./weather-container/weather-container.component";
import { WeatherCardComponent } from "./weather-card/weather-card.component";
import { LocationFormComponent } from "./location-form/location-form.component";
import { WeatherService } from "./weather.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [CommonModule, MainRoutesModule, FormsModule, SharedModule, ReactiveFormsModule],
  declarations: [
    WeatherCardComponent,
    LocationFormComponent,
    WeatherContainerComponent
  ],
  providers: [WeatherService]
})
export class MainModule {}
