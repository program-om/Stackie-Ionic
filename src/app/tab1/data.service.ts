import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private basketsSource = new BehaviorSubject([]);
  currentBaskets = this.basketsSource.asObservable();

  constructor() { }

  changeBaskets(baskets: []) {
    this.basketsSource.next(baskets);
  }
}
