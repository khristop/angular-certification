import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, startWith, switchMap, take } from "rxjs/operators";
import { PlacesService } from "src/app/core/services/places.service";
import { StativeButtonComponent } from "src/app/shared/components/stative-button/stative-button.component";
import { WeatherService } from "../weather.service";

export interface Location {
  name: string;
  zipcode: string;
}

@Component({
  selector: "app-location-form",
  templateUrl: "./location-form.component.html",
  styleUrls: ["./location-form.component.scss"]
})
export class LocationFormComponent implements OnInit {
  @Output() zipcodeSelected = new EventEmitter<string>();
  @ViewChild(StativeButtonComponent, { static: false}) buttonRef: StativeButtonComponent;

  zipcode = new FormControl('');
  placesHints$: Observable<Location[]>;

  constructor(private weatherService: WeatherService, private placesService: PlacesService) {}

  ngOnInit() {
    this.placesHints$ = this.zipcode.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((hint: string) =>  this.placesService.getPlaces(hint))
      );
  }

  addLocation() {
    const zipcode = this.zipcode.value;
    this.zipcodeSelected.emit(zipcode);
    this.weatherService.addLocationStatus$
      .pipe(
        filter(value => !value),
        take(1)
      )
      .subscribe(status => this.buttonRef.finish());
  }
}
