import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private newBasketUrl = "https://stackie.herokuapp.com/api/baskets/";
  private removeBasketUrl = "https://stackie.herokuapp.com/api/baskets/";
  private allBasketsUrl = "https://stackie.herokuapp.com/api/baskets";
  private singleBasketUrl = "https://stackie.herokuapp.com/api/baskets/";
  private basketQuestionsUrl = "https://stackie.herokuapp.com/api/baskets/";
  private addQuestionToBasketUrl = "https://stackie.herokuapp.com/api/baskets/";
  private removeQuestionsFromBasketUrl = "https://stackie.herokuapp.com/api/baskets/";
  private reorderBasketQuestionsUrl = "https://stackie.herokuapp.com/api/baskets/";
  private reorderBasketUrl = "https://stackie.herokuapp.com/api/baskets/reorder";

  greeting = "hi";


  constructor(private http: HttpClient) { }

  newBasket(data) {
    return this.http.post<any>(this.newBasketUrl, data);
  }

  deleteBasket(basketId: string) {
    return this.http.delete<any>(this.removeBasketUrl + basketId);
  }

  singleBasket(basketId: string) {
    return this.http.get<any>(this.singleBasketUrl + basketId);
  }

  allBaskets() {
    return this.http.get<any>(this.allBasketsUrl);
  }

  async getToken(): Promise<string> {
    let ret = await Storage.get({ key: 'token' });
    return ret.value;
  }

  getBasketQuestions(basketId: string) {
    return this.http.get<any>(this.basketQuestionsUrl + basketId + '/questions');
  }

  addQuestionToBasket(basketId: string, data: { questionId: string, answersIds: string[] }) {
    return this.http.post<any>(this.addQuestionToBasketUrl + basketId + '/question', data);
  }

  removeQuestionsFromBasket(questionIds: string[], basketId: string) {
    const data = { questionIds };
    return this.http.patch< {result: []} >(this.removeQuestionsFromBasketUrl + basketId + '/questions', data);
  }

  reorderBaskets(data: {prevIndex: number, currentIndex: number}) {
    return this.http.patch<any>(this.reorderBasketUrl, data);
  }

  reorderBasketQuestions(basketId: string, data: {prevIndex: number, currentIndex: number}) {
    return this.http.patch<any>(this.reorderBasketQuestionsUrl + basketId + '/reorder-questions', data);
  }
}
