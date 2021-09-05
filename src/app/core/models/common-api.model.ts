export interface Coordinate {
  lon: number;
  lat: number;
}

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ErrorMessage {
  cod: string;
  message: string;
}
