import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { SearchQuestionComponent } from './search-question/search-question.component';
import { QuestionService } from '../_services/question.service';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    SharedComponentsModule
  ],
  declarations: [Tab2Page, SearchQuestionComponent],
  providers: [QuestionService]
})
export class Tab2PageModule {}
