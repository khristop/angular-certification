import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ForecastResponse } from "../../core/models/forecast-api.model";
import { MeasurementUnit } from "../../core/models/weather.model";
import { MEASUREMENT_UNIT } from "../../core/tokens/measurement-unit.token";

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.css"]
})
export class ForecastComponent implements OnInit {
  forecastData: ForecastResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    @Inject(MEASUREMENT_UNIT) public measurmentUnit: MeasurementUnit
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.forecastData = data.forecastData;
    });
  }
}
