import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionUrl = 'https://stackie.herokuapp.com/api/questions/';
  private questionAnswersUrl = 'https://stackie.herokuapp.com/api/questions/';
  private questionSomeAnswersUrl = 'https://stackie.herokuapp.com/api/baskets/';

  constructor(private http: HttpClient) { }

  getQuestion(questionId) {
    return this.http.get<any>(this.questionUrl + questionId);
  }

  getQuestionAnswers(questionId) {
    return this.http.get<any>(this.questionAnswersUrl + questionId + '/answers');
  }

  getQuestionSomeAnswers(basketId: string, questionId: string) {
    return this.http.get<any>(this.questionSomeAnswersUrl + basketId +
      '/question/' + questionId + '/answers');
  }
}
