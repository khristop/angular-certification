import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ForecastResponse } from "../models/forecast-api.model";
import { WeatherResponse } from "../models/weather-api.model";

@Injectable({
  providedIn: "root"
})
export class WeatherAPIService {
  private weatherAPI = environment.weatherAPI + "weather";
  private forecastAPI = environment.weatherAPI + "forecast/daily";

  constructor(private httpClient: HttpClient) {}

  getWeatherByZipcode(zipcode: string): Observable<WeatherResponse> {
    const params = new HttpParams().set("zip", zipcode);
    return this.httpClient.get<WeatherResponse>(this.weatherAPI, {
      params
    });
  }

  getForecastByZipcode(zipcode: string): Observable<ForecastResponse> {
    const params = new HttpParams().set("zip", zipcode).set("cnt", "5");
    return this.httpClient.get<ForecastResponse>(this.forecastAPI, {
      params
    });
  }
}
