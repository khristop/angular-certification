import { WeatherResponse } from "./weather-api.model";

export interface Weather extends WeatherResponse {
  zipcode: string;
  countryCode?: string;
}

export type MeasurementUnit = "standard" | "metric" | "imperial";
