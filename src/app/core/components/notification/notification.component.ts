import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorMessageService } from '../../services/error-message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  showError = false;
  error$: Observable<string>;
  constructor(private errorMessageService: ErrorMessageService) {}

  ngOnInit() {
    this.error$ = this.errorMessageService.errorMessage$.pipe(
      tap(() => {
        this.showError = true;
      })
    );
  }
}
