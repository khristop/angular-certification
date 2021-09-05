import { Injectable } from "@angular/core";
import { BehaviorSubject, merge, combineLatest, of } from "rxjs";
import { WeatherResponse } from "../core/models/weather-api.model";
import { Weather } from "../core/models/weather.model";
import { StorageService } from "../core/services/storage.service";
import { WeatherAPIService } from "../core/services/weather-api.service";

@Injectable()
export class WeatherService {
  private locationsKey = "locations";
  private zipcodes = this.getLocations();

  private locationWeathersSubject$ = new BehaviorSubject<Weather[]>([]);
  private get locationWeathers() {
    return this.locationWeathersSubject$.getValue();
  }
  locationWeathers$ = this.locationWeathersSubject$.asObservable();

  constructor(
    private storage: StorageService,
    private weatherAPIService: WeatherAPIService
  ) {
    this.fetchData();
  }

  protected fetchData() {
    if (this.zipcodes) {
      const observers = this.zipcodes.map(zipcode =>
        combineLatest([
          of(zipcode),
          this.weatherAPIService.getWeatherByZipcode(zipcode)
        ])
      );

      merge(...observers).subscribe(([zipcode, weatherData]) => {
        weatherData["zipcode"] = zipcode;
        this.locationWeathersSubject$.next([
          ...this.locationWeathers,
          weatherData as Weather
        ]);
      });
    }
  }

  private saveLocations(locations: string[]): void {
    this.zipcodes = locations;
    this.storage.save(this.locationsKey, JSON.stringify(locations));
  }

  getLocations(): string[] {
    const locationsSaved = this.storage.get(this.locationsKey);
    return locationsSaved ? JSON.parse(locationsSaved) : [];
  }

  addLocation(newLocationZipcode: string): void {
    if (this.zipcodes.includes(newLocationZipcode)) {
      return; // return some error or display zipcode already selected
    }
    this.weatherAPIService
      .getWeatherByZipcode(newLocationZipcode)
      .subscribe((weatherData: WeatherResponse) => {
        weatherData["zipcode"] = newLocationZipcode;
        this.locationWeathersSubject$.next([
          ...this.locationWeathers,
          weatherData as Weather
        ]);
        this.saveLocations([...this.zipcodes, newLocationZipcode]);
      });
  }

  removeLocationByZipcode(zipcode: string) {
    const locationsUpdated = this.locationWeathers.filter(
      location => location.zipcode !== zipcode
    );
    this.locationWeathersSubject$.next(locationsUpdated);
    this.saveLocations(locationsUpdated.map(location => location.zipcode));
  }
}
