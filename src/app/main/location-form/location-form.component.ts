import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { filter, take } from "rxjs/operators";
import { StativeButtonComponent } from "src/app/shared/components/stative-button/stative-button.component";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-location-form",
  templateUrl: "./location-form.component.html",
  styleUrls: ["./location-form.component.scss"]
})
export class LocationFormComponent {
  @Output() zipcodeSelected = new EventEmitter<string>();
  @ViewChild(StativeButtonComponent, { static: false}) buttonRef: StativeButtonComponent;

  locations = [
    {
      zipcode: '312',
      name: 'City 1'
    },
    {
      zipcode: '313',
      name: 'City ABC'
    },
    {
      zipcode: '315',
      name: 'City rew'
    },
    {
      zipcode: '314',
      name: 'City CDF'
    },
    {
      zipcode: '316',
      name: 'City ytt'
    },
  ];

  constructor(private weatherService: WeatherService) {}

  addLocation(zipcode: string) {
    this.zipcodeSelected.emit(zipcode);
    this.weatherService.addLocationStatus$
      .pipe(
        filter(value => !value),
        take(1)
      )
      .subscribe(status => this.buttonRef.finish());
  }
}
