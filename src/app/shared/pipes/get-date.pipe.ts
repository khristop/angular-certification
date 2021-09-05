import { Pipe, PipeTransform } from "@angular/core";
// get a Date object from Time of data
@Pipe({ name: "getDate" })
export class GetDatePipe implements PipeTransform {
  transform(value: number, format?: string): Date {
    return new Date(value * 1000);
  }
}
