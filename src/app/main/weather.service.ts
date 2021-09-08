import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of, interval, Subscription, forkJoin, concat } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { WeatherResponse } from '../core/models/weather-api.model';
import { Weather } from '../core/models/weather.model';
import { StorageService } from '../core/services/storage.service';
import { WeatherAPIService } from '../core/services/weather-api.service';
export interface Location {
  zipcode: string;
  countryCode?: string;
}
@Injectable()
export class WeatherService implements OnDestroy {
  private locationsKey = 'locations';
  private locations: Location[] = this.getLocations();
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
        if (this.locations?.length > 0) {
          const observers = this.locations.map((location) =>
            forkJoin([
              of(location),
              this.weatherAPIService.getWeatherByLocation(location.zipcode, location.countryCode)
            ])
          );

          concat(...observers).subscribe(([location, weatherResponse]) => {
            const newWeatherData = {
              ...weatherResponse,
              ...location
            };
            const oldWeatherData = [...this.locationWeathersSubject$.value];
            let updateWeather = [];

            if (oldWeatherData.length > 0 && oldWeatherData.find(weather =>
                weather.zipcode === location.zipcode && weather.countryCode === location.countryCode)) {
              updateWeather = oldWeatherData.map(weather =>
                weather.zipcode === location.zipcode && weather.countryCode === location.countryCode ?
                newWeatherData : weather);
            } else {
              updateWeather = [...oldWeatherData, newWeatherData];
            }
            this.locationWeathersSubject$.next(updateWeather);
          });
        }
      });
  }

  private saveLocations(locations: Location[]): void {
    this.locations = locations;
    this.storage.save(this.locationsKey, JSON.stringify(locations));
  }

  getLocations(): Location[] {
    const locationsSaved = this.storage.get(this.locationsKey);
    return locationsSaved ? JSON.parse(locationsSaved) : [];
  }

  addLocation(location: Location): void {
    location.countryCode = location.countryCode || 'US';
    let {zipcode, countryCode} = location;
    this.addLocationStatus$.next(true);
    if (!zipcode ||this.locations.some(item =>
      item.zipcode === zipcode &&
      ((!item.countryCode && !countryCode) || item.countryCode === countryCode))
    ) {
      this.addLocationStatus$.next(false);
      return; // return some error or display zipcode already selected
    }
    this.weatherAPIService
      .getWeatherByLocation(zipcode, countryCode)
      .pipe(
        catchError(err => {
          this.addLocationStatus$.next(false);
          return err;
        })
      )
      .subscribe((weatherData: WeatherResponse) => {
        weatherData['zipcode'] = zipcode;
        weatherData['countryCode'] = countryCode;
        this.locationWeathersSubject$.next([
          ...this.locationWeathers,
          weatherData as Weather
        ]);
        this.saveLocations([...this.locations, location]);
        this.addLocationStatus$.next(false);
      });
  }

  removeLocationByZipcode(zipcode: string) {
    const locationsUpdated = this.locationWeathers.filter(
      location => location.zipcode !== zipcode
    );
    this.locationWeathersSubject$.next(locationsUpdated);
    this.saveLocations(locationsUpdated.map(({zipcode, countryCode}) => ({zipcode, countryCode})));
  }
}
