import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketPage } from './basket.page';

const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: '',
        component: BasketPage,
      },
      {
        path: 'question',
        loadChildren: () => import('../question/question.module').then( m => m.QuestionPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasketPageRoutingModule {}
