import { Pipe, PipeTransform } from '@angular/core';
import { MeasurementUnit } from '../../core/models/weather.model';

@Pipe({ name: 'measureUnit' })
export class MeasureUnitPipe implements PipeTransform {
  transform(value: number, unit: MeasurementUnit): string {
    switch (unit) {
      case 'metric':
        return `${value} °C`;
      case 'imperial':
        return `${value} °F`;
      default:
        return `${value} °K`;
    }
  }
}
