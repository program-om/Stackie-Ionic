import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/Types';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent implements OnInit {
  @Input() questions: Question[];

  constructor() { }

  ngOnInit() {}

}
