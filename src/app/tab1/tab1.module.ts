import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Tab1Page } from './tab1.page';
import { NewBasketComponent } from './new-basket/new-basket.component';
import { BasketListComponent } from './basket-list/basket-list.component';
import { BasketComponent } from './basket-list/basket/basket.component';
import { BasketService } from '../_services/basket.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: Tab1Page }
    ])
  ],
  providers: [BasketService],
  declarations: [Tab1Page, NewBasketComponent, BasketListComponent, BasketComponent]
})
export class Tab1PageModule {}
