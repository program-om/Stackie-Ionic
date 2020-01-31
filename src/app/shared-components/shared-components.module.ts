import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AnswersListComponent } from './answers-list/answers-list.component';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answers-list/answer/answer.component';



@NgModule({
  declarations: [QuestionComponent, AnswersListComponent, AnswerComponent],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [QuestionComponent, AnswersListComponent]
})
export class SharedComponentsModule { }
