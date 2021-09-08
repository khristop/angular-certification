import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WeatherAPIInterceptor } from './interceptors/weather-api.interceptor';
import { MEASUREMENT_UNIT } from './tokens/measurement-unit.token';
import { NotificationComponent } from './components/notification/notification.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [NotificationComponent, NotFoundComponent],
  declarations: [NotificationComponent, NotFoundComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeatherAPIInterceptor,
      multi: true
    },
    {
      provide: MEASUREMENT_UNIT,
      useValue: 'metric'
    }
  ]
})
export class CoreModule {}
