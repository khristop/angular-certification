import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, of, interval, Subscription, forkJoin, concat } from "rxjs";
import { startWith } from "rxjs/operators";
import { WeatherResponse } from "../core/models/weather-api.model";
import { Weather } from "../core/models/weather.model";
import { StorageService } from "../core/services/storage.service";
import { WeatherAPIService } from "../core/services/weather-api.service";

@Injectable()
export class WeatherService implements OnDestroy {
  private locationsKey = "locations";
  private zipcodes = this.getLocations();
  private refreshInterval = 30000;
  private refreshSubscription: Subscription;

  private locationWeathersSubject$ = new BehaviorSubject<Weather[]>([]);
  private get locationWeathers() {
    return this.locationWeathersSubject$.getValue();
  }
  locationWeathers$ = this.locationWeathersSubject$.asObservable();

  addLocationStatus$ = new BehaviorSubject<boolean>(false);

  constructor(
    private storage: StorageService,
    private weatherAPIService: WeatherAPIService
  ) {
    this.fetchData();
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }

  protected fetchData() {
    this.refreshSubscription = interval(this.refreshInterval)
      .pipe(startWith(0))
      .subscribe( () => {
        if (this.zipcodes?.length > 0) {
          const observers = this.zipcodes.map(zipcode =>
            forkJoin([
              of(zipcode),
              this.weatherAPIService.getWeatherByZipcode(zipcode)
            ])
          );
    
          concat(...observers).subscribe(([zipcode, weatherResponse]) => {
            const newWeatherData = {
              ...weatherResponse,
              zipcode
            };
            const oldWeatherData = [...this.locationWeathersSubject$.value];
            let updateWeather = [];

            if (oldWeatherData.length > 0 && oldWeatherData.find(weather => weather.zipcode === zipcode)) {
              updateWeather = oldWeatherData.map(weather => weather.zipcode === zipcode ? newWeatherData : weather);
            } else {
              updateWeather = [...oldWeatherData, newWeatherData];
            }
            this.locationWeathersSubject$.next(updateWeather);
          });
        }
      });
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
    this.addLocationStatus$.next(true);
    if (!newLocationZipcode || this.zipcodes.includes(newLocationZipcode)) {
      this.addLocationStatus$.next(false);
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
        this.addLocationStatus$.next(false);
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
