import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasketPageRoutingModule } from './basket-routing.module';

import { BasketPage } from './basket.page';
import { QuestionItemComponent } from './questions-list/question-item/question-item.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasketPageRoutingModule
  ],
  declarations: [
    BasketPage,
    QuestionsListComponent,
    QuestionItemComponent,
    PopoverComponent ],
    entryComponents: [ PopoverComponent ]
})
export class BasketPageModule {}
