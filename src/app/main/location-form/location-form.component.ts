import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder} from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, switchMap, take } from "rxjs/operators";
import { Country } from "src/app/core/models/country.model";
import { PlacesService } from "src/app/core/services/places.service";
import { StativeButtonComponent } from "src/app/shared/components/stative-button/stative-button.component";
import { AutocompleteOptionData } from "src/app/shared/directives/autocomplete/autocomplete.directive";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-location-form",
  templateUrl: "./location-form.component.html",
  styleUrls: ["./location-form.component.scss"]
})
export class LocationFormComponent implements OnInit {
  @ViewChild(StativeButtonComponent, { static: false}) buttonRef: StativeButtonComponent;

  placesHints$: Observable<Country[]>;

  locationForm = this.fb.group({
    zipcode: [''],
    countryAutocomplete: [null] 
  });

  displayWithFn = (locationSelected: Country) => locationSelected.name;
  setValueByFn = (locationSelected: Country) => locationSelected.code;

  constructor(private weatherService: WeatherService, private placesService: PlacesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.placesHints$ = this.locationForm.get('countryAutocomplete').valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(({search}: AutocompleteOptionData) =>  this.placesService.getPlaces(search))
      );
  }

  addLocation() {
    const {zipcode, countryAutocomplete} = this.locationForm.value;
    this.weatherService.addLocation({
      zipcode,
      ...(countryAutocomplete?.selectedValue && {countryCode: countryAutocomplete.selectedValue})
    });
    this.weatherService.addLocationStatus$
      .pipe(
        filter(value => !value),
        take(1)
      )
      .subscribe(status => this.buttonRef.finish());
  }
}
