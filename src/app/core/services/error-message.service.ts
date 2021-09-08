import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorMessage } from '../models/common-api.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private errorMessageSubject$ = new BehaviorSubject<string>(null);
  errorMessage$ = this.errorMessageSubject$.asObservable();
  showError(err: ErrorMessage) {
    this.errorMessageSubject$.next(err.message);
  }
}
