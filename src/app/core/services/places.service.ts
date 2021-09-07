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
      zipcode: '312',
      name: 'City 1'
    },
    {
      zipcode: '313',
      name: 'City ABC'
    },
    {
      zipcode: '315',
      name: 'City rew'
    },
    {
      zipcode: '314',
      name: 'City CDF'
    },
    {
      zipcode: '316',
      name: 'City ytt'
    },
  ];

  constructor(private httpClient: HttpClient) {}

  getPlaces(hint: string): Observable<any> {
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
