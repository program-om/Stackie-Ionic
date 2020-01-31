import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'src/app/Types';
import { ChosenAnswersService } from 'src/app/tab2/chosen-answers.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer;
  @Input() normalAnswer: boolean;

  constructor(private chosenAnswerService: ChosenAnswersService) { }

  ngOnInit() {}

  selectAnswer(answerId: string) {
    answerId = answerId.toString();
    this.chosenAnswerService.changeAnswers(answerId);
  }

}
