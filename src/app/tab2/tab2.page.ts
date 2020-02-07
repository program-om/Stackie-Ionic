import { Component, OnInit } from '@angular/core';
import { ChosenAnswersService } from './chosen-answers.service';
import { ToastController } from '@ionic/angular';
import { BasketService } from '../_services/basket.service';
import { Router } from '@angular/router';
import { LoggedInService } from '../_services/logged-in.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  answersIds: string[] = [];
  questionId = '';
  baskets = [];
  basketId: string;
  loggedIn = false;
  receivedQuestion = false;

  constructor(private chosenAnswersService: ChosenAnswersService,
              public toastController: ToastController,
              private basketService: BasketService,
              private router: Router,
              private loggedInService: LoggedInService) {}

  ngOnInit() {
    this.chosenAnswersService.currentAnswers
    .subscribe( (answerId: string) => {
      this.answersIds.push(answerId);
      console.log(this.answersIds);
    });
    this.loggedInService.loggedIn
    .subscribe( async val => {
      this.loggedIn = val;
      if (this.loggedIn) {
        // if baskets exist in Storage
        //    get baskets from Storage
        const ret = await Storage.get({key: 'baskets'});
        if (ret.value) {
          this.baskets = JSON.parse(ret.value);
        } else {
        // if baskets do not exist in Storage
        //    fetch baskets list - http call
          this.getBaskets();
        }
      }
    });
  }

  async saveQuestion() {
    if (this.answersIds.length === 0) {
      await this.invalidInput('choose at least one answer');
      return;
    }
    if (!this.basketId) {
      await this.invalidInput('choose basket');
      return;
    }
    console.log(this.answersIds);
    const data = {
      questionId: this.questionId,
      answersIds: this.answersIds
    };
    this.basketService.addQuestionToBasket(this.basketId, data)
    .subscribe( res => {
      this.router.navigate(['/tabs/tab1']);
    }, err => {
      this.invalidInput(err.message);
    });
  }

  async invalidInput(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 3000,
      showCloseButton: true,
      animated: true
    });
    toast.present();
  }

  onNewSearch(questionId: string) {
    this.questionId = questionId;
    this.answersIds = [];
  }

  getBaskets() {
    this.basketService.allBaskets()
    .subscribe( async res => {
      this.baskets = res.result;
      await Storage.set({
        key: 'baskets',
        value: JSON.stringify(res.result)
      });
    });
  }

  selectBasket(basketId: string) {
    this.basketId = basketId;
  }

  receiveQuestionSig(signal: boolean) { // receive question signal
    this.receivedQuestion = signal;
  }

}
