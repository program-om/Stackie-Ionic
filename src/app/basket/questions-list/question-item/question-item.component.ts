import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/Types';
import { CommunicationService } from '../../communication.service';

@Component({
  selector: 'app-question-item',
  templateUrl: './question-item.component.html',
  styleUrls: ['./question-item.component.scss'],
})
export class QuestionItemComponent implements OnInit {

  @Input() question: Question;
  showSelectBox = false;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.communicationService.selectBoxAppearance
    .subscribe( val => {
      this.showSelectBox = val;
    });
  }

  selectQuestion(questionId: string) {
    this.communicationService.addQuestionId(questionId);
  }

}
