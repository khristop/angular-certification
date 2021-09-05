import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-location-form",
  templateUrl: "./location-form.component.html",
  styleUrls: ["./location-form.component.css"]
})
export class LocationFormComponent {
  @Output() zipcodeSelected = new EventEmitter<string>();
}
