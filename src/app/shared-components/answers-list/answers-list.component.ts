import { Component, OnInit, Input } from '@angular/core';
import { Answer } from 'src/app/Types';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.scss'],
})
export class AnswersListComponent implements OnInit {
  @Input() answers: Answer[];
  @Input() normalAnswers: boolean;

  constructor() { }

  ngOnInit() {}

}
