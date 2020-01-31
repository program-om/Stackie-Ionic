import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {
  private loggedInSource = new BehaviorSubject(false);
  loggedIn: Observable<boolean> = this.loggedInSource.asObservable();

  constructor(private authService: AuthService) {
    this.authService.loggedIn()
    .then(val => {
      this.loggedInSource.next(val);
    });
  }

  changeLoggedIn(val: boolean) {
    this.loggedInSource.next(val);
  }
}
