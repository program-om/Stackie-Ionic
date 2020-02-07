import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Question } from '../Types';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  async getBasketQuestions(basketId: string): Promise<Question[] | null> {
    const ret = await Storage.get({key: 'basketsQuestions'});
    /* Problem:
      Need to update basket in lacal storage when a new question is added a saved basket
    */
    const basketsQuestions = JSON.parse(ret.value);
    let basketQuestions: Question[] | null;
    basketsQuestions.forEach( basket => {
      if (basket.id === basketId) {
        basketQuestions = basket.questions;
        return;
      }
    });
    return basketQuestions;
  }

}
