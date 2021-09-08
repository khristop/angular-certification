import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastResolver } from './forecast.resolver';
import { ForecastComponent } from './forecast/forecast.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/'
  },
  {
    path: ':zipcode',
    component: ForecastComponent,
    resolve: {
      forecastData: ForecastResolver
    }
  },
  {
    path: ':countryCode/:zipcode',
    component: ForecastComponent,
    resolve: {
      forecastData: ForecastResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ForecastResolver]
})
export class LocationForecastRoutesModule {}
