import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChosenAnswersService {
  private answersSource = new Subject();
  currentAnswers = this.answersSource.asObservable();

  constructor() { }

  changeAnswers(answers: string) {
    this.answersSource.next(answers);
  }
}
