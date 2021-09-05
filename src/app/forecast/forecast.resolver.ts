import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { EMPTY, Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ForecastResponse } from "../core/models/forecast-api.model";
import { WeatherAPIService } from "../core/services/weather-api.service";

@Injectable({ providedIn: "root" })
export class ForecastResolver implements Resolve<ForecastResponse> {
  constructor(
    private weatherAPIService: WeatherAPIService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ForecastResponse> {
    const zipcode = route.paramMap.get("zipcode");
    return this.weatherAPIService.getForecastByZipcode(zipcode).pipe(
      catchError(() => {
        this.router.navigate(["/not-found"]);
        return EMPTY;
      })
    );
  }
}
