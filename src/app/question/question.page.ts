import { Component, OnInit, ElementRef } from '@angular/core';
import { QuestionService } from '../_services/question.service';
import { Question, Answer } from '../Types';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-question-page',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  basketId: string;
  questionId: string;
  question: Question;
  answers: Answer[];
  receivedQuestion = false;
  answersIds: string[];

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              public ele: ElementRef) { }

  ngOnInit() {
    this.basketId = this.route.snapshot.pathFromRoot.map(o => o.url[0])[5].path;

    this.route.paramMap
    .subscribe( (params: ParamMap) => {
      this.questionId = params.get('id');
      this.getQuestion();
    });
  }

  getQuestion() {
    this.questionService.getQuestion(this.questionId)
    .subscribe( res => {
      if (res.items) {
        this.question = res.items[0];
        this.receivedQuestion = true;
        this.fetchAnswers();
      }
    }, err => {
      console.log(err);
    });
  }

  fetchAnswers() {
    this.questionService.getQuestionSomeAnswers(this.basketId, this.questionId)
    .subscribe(res => {
      this.answers = res.items;
    }, err => {
      console.log(err.message);
    });
  }

}
