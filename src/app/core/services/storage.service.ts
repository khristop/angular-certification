import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  get(key: string): string {
    return localStorage.getItem(key);
  }

  save(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
