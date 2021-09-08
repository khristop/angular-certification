import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private placesApi = environment.placesAPI;

  locations = [
    {
      code: '95742',
      name: 'USA'
    },
    {
      code: '25000',
      name: 'France'
    },
    {
      code: '2024',
      name: 'Australia'
    },
  ];

  constructor(private httpClient: HttpClient) {}

  getPlaces(hint: string): Observable<unknown> {
    return of(hint)
      .pipe(
        map(value => value ?
          this.locations.filter(location => location.name.toLowerCase().includes(hint.toLowerCase())): 
          this.locations
          )
      );
    // return this.httpClient.get<unknow>(this.placesApi);
  }
}
