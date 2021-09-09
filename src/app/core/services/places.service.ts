import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Country, CountryResponse } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private placesApi = environment.placesAPI + '/name/';

  constructor(private httpClient: HttpClient) {}

  getPlaces(hint: string): Observable<Country[]> {
    return this.httpClient.get<CountryResponse[]>(this.placesApi + hint)
    .pipe(
      map(response => response.map(country => ({name: country.name, code: country.alpha2Code}))),
      catchError( err => {
        return [];
      })
    );
  }
}
