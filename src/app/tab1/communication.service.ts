import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private reorderListSource = new BehaviorSubject<boolean>(false);
  reorderList = this.reorderListSource.asObservable();

  constructor() { }

  toggleReorderList(signal: boolean) {
    this.reorderListSource.next(signal);
  }
}
