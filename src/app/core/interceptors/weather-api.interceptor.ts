import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { MEASUREMENT_UNIT } from '../tokens/measurement-unit.token';
import { MeasurementUnit } from '../models/weather.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorMessageService } from '../services/error-message.service';
import { ErrorMessage } from '../models/common-api.model';

@Injectable()
export class WeatherAPIInterceptor implements HttpInterceptor {
  private weatherAPIUrl = environment.weatherAPI;
  private weatherAPIKey = environment.weatherAPIKey;

  constructor(
    @Inject(MEASUREMENT_UNIT) private measurmentUnit: MeasurementUnit,
    private errorMessageService: ErrorMessageService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isWeatherApiRequest = req.url.includes(this.weatherAPIUrl);
    if (isWeatherApiRequest) {
      req = req.clone({
        setParams: {
          appid: this.weatherAPIKey,
          units: this.measurmentUnit
        }
      });
    }
    return isWeatherApiRequest ? next.handle(req).pipe(
      catchError(err => {
        if (err.status === 404) {
          this.errorMessageService.showError(err.error as ErrorMessage);
        }
        return throwError(err);
      })
    ) : next.handle(req);
  }
}
