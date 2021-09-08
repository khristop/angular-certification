import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MeasurementUnit, Weather } from '../../core/models/weather.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {
  @Input() weatherInfo: Weather;
  @Input() measureUnit: MeasurementUnit;
  @Output() removeLocation = new EventEmitter<Weather>();
}
