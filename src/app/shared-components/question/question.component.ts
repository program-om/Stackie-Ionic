import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/Types';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;

  constructor() { }

  ngOnInit() {}

}
