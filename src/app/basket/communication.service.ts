import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private selectBoxSource = new BehaviorSubject<boolean>(false);
  selectBoxAppearance = this.selectBoxSource.asObservable();

  private questionIdSource = new Subject<string>();
  newQuestionId = this.questionIdSource.asObservable();

  constructor() { }

  changeSelectBoxAppearance(val: boolean) {
    this.selectBoxSource.next(val);
  }

  addQuestionId(qId: string) {
    this.questionIdSource.next(qId.toString());
  }
}
