import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPageRoutingModule } from './question-routing.module';

import { QuestionPage } from './question.page';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { HideHeaderDirective } from '../_directives/hide-header.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [QuestionPage, HideHeaderDirective]
})
export class QuestionPageModule {}
