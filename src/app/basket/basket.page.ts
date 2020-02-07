import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { BasketService } from '../_services/basket.service';
import { Basket, Question } from '../Types';
import { PopoverController, ToastController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { CommunicationService } from './communication.service';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { LocalStorageService } from '../_services/local-storage.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit, OnDestroy {
  basketId: string = '';
  basket: Basket = { name: '' };
  basketQuestions: Question[] = [];
  questionsReceived = false;
  popover = null;
  selectBox = false;
  selectedQuestions: string[] = [];

  constructor(private basketService: BasketService,
              private router: Router,
              private route: ActivatedRoute,
              private popoverController: PopoverController,
              private communicationService: CommunicationService,
              private toastController: ToastController,
              private alertController: AlertController,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.basket.name = '';
      this.basketId = params.get('id');
      this.localStorageService.getBasketQuestions(this.basketId)
      .then( val => {
        this.basketQuestions = val;
        if (!this.basketQuestions) {
          this.getBasketQuestions();
        } else {
          this.questionsReceived = true;
        }
      });
    });
    this.communicationService.newQuestionId
    .subscribe( (questionId: string) => {
      const index = this.selectedQuestions.indexOf(questionId);
      if (index >= 0) {
        this.selectedQuestions.splice(index, 1);
      } else {
        this.selectedQuestions.push(questionId);
      }
    });
  }

  ngOnDestroy() {
    if (this.popover) {
      this.popover.dismiss()
      .then( () => { this.popover = null; });
    }
  }

  getBasketQuestions() {
    this.basketService.getBasketQuestions(this.basketId)
    .subscribe(res => {
      this.basketInfo();
      this.basketQuestions = res;
      this.questionsReceived = true;
      Storage.get({key: 'basketsQuestions'})
      .then( async ret => {
        let basketsQuestions = JSON.parse(ret.value);
        basketsQuestions.push({id: this.basketId, questions: this.basketQuestions});
        await Storage.set({ key: 'basketsQuestions', value: JSON.stringify(basketsQuestions)});
      });
    });
  }

  goToQuestion(qId) {
    let answersIds = [];
    this.basket.questions.forEach(question => {
      if (question.questionId === qId) {
        answersIds = question.answersIds;
      }
    });
    this.router.navigate(['/question-answers/' + qId], {queryParams: {answersIds}});
  }

  basketInfo() {
    this.basketService.singleBasket(this.basketId)
    .subscribe( res => {
      this.basket = res.result;
    });
  }

  async presentPopover(ev: any) {
    this.popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      componentProps: { basketId: this.basketId }
    });
    return await this.popover.present();
  }

  showSelectBox() {
    this.communicationService.changeSelectBoxAppearance(true);
    this.selectBox = true;
  }

  hideSelectBox() {
    this.communicationService.changeSelectBoxAppearance(false);
    this.selectBox = false;
    this.selectedQuestions = [];
  }

  async deleteQuestions() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'You are about to delete basket questions',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          cssClass: 'secondary',
          handler: () => {
            this.deleteQuestionsFromBasket();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteQuestionsFromBasket() {
    this.basketService.removeQuestionsFromBasket(this.selectedQuestions, this.basketId)
    .subscribe( async res => {
      const toast = await this.toastController.create({
        message: 'Questions are deleted',
        duration: 2000,
        showCloseButton: true,
        animated: true
      });
      this.updateBasketQuestions();
      this.hideSelectBox();
      toast.present();
    }, err => {
      console.log(err);
    });
  }

  updateBasketQuestions() {
    this.basketQuestions = this.basketQuestions.filter( q =>
      !this.selectedQuestions.includes(q.question_id.toString())
    );
  }

}
