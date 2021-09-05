import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WeatherContainerComponent } from "./weather-container/weather-container.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: WeatherContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutesModule {}
