import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionService } from 'src/app/_services/question.service';
import { Question, Answer } from '../../Types';
import { LoggedInService } from 'src/app/_services/logged-in.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search-question',
  templateUrl: './search-question.component.html',
  styleUrls: ['./search-question.component.scss'],
})
export class SearchQuestionComponent implements OnInit {

  questionId: string;
  question: Question;
  answers: Answer[];
  receivedQuestion = false;
  receivedResponse = true;
  searchSubmitted = false;
  loggedIn = true;
  @Output() newSearch = new EventEmitter<string>();
  @Output() gotTheQuestion = new EventEmitter<boolean>();
  invalidQuestionId = false;

  constructor(private questionService: QuestionService,
              private loggedInService: LoggedInService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.loggedInService.loggedIn
    .subscribe( val => {
      this.loggedIn = val;
    });
  }

  searchQuestion() {
    this.newSearch.emit(this.questionId);
    // resetting values
    this.question = null;
    this.answers = [];
    this.receivedQuestion = false;
    this.gotTheQuestion.emit(false);
    this.receivedResponse = false;
    // end resetting
    this.searchSubmitted = true;
    this.questionService.getQuestion(this.questionId)
    .subscribe( async res => {
      this.receivedResponse = true;
      if (res && res.items && res.items.length > 0) {
        this.question = res.items[0];
        this.receivedQuestion = true;
        this.gotTheQuestion.emit(true);
        this.fetchAnswers();
      } else if (res && res.items && res.items.length === 0) {
        await this.showToast('Invalid question id');
      } else {
        await this.showToast('Something went wrong');
      }
    });
  }

  fetchAnswers() {
    this.questionService.getQuestionAnswers(this.questionId)
    .subscribe(res => {
      this.answers = res.items;
    }, err => {
      console.log(err.message);
    });
  }

  async showToast(errMessage: string) {
    const toast = await this.toastController.create({
      message: errMessage,
      duration: 3000,
      showCloseButton: true,
      animated: true
    });
    toast.present();
  }

}
