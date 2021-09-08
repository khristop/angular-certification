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

  getWeatherByLocation(zipcode: string, country?: string): Observable<WeatherResponse> {
    const params = new HttpParams().set("zip", `${zipcode.replace(/\s+/g, '')},${country.toLowerCase()}`);
    return this.httpClient.get<WeatherResponse>(this.weatherAPI, {
      params
    });
  }

  getForecastByLocation(zipcode: string, country?: string): Observable<ForecastResponse> {
    const params = new HttpParams().set("zip", `${zipcode.replace(/\s+/g, '')},${country.toLowerCase()}`).set("cnt", "5");
    return this.httpClient.get<ForecastResponse>(this.forecastAPI, {
      params
    });
  }
}
