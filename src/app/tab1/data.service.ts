import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private basketsSource = new BehaviorSubject([]);
  currentBaskets = this.basketsSource.asObservable();

  constructor() { }

  changeBaskets(baskets: []) {
    this.basketsSource.next(baskets);
    Storage.set({key: 'baskets', value: JSON.stringify(baskets)});
  }
}
