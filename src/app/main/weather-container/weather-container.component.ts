import { Component, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { MeasurementUnit, Weather } from "../../core/models/weather.model";
import { MEASUREMENT_UNIT } from "../../core/tokens/measurement-unit.token";
import { LocationFormData } from "../location-form/location-form.component";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-weather-container",
  templateUrl: "./weather-container.component.html",
  styleUrls: ["./weather-container.component.css"]
})
export class WeatherContainerComponent {
  locationsWeather: Observable<Weather[]> = this.weatherService
    .locationWeathers$;

  constructor(
    private weatherService: WeatherService,
    @Inject(MEASUREMENT_UNIT) public measurmentUnit: MeasurementUnit
  ) {}

  addLocation(requestData: LocationFormData) {
    this.weatherService.addLocation(requestData);
  }

  removeLocation({ zipcode }: Weather) {
    this.weatherService.removeLocationByZipcode(zipcode);
  }
}
