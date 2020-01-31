import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/_services/basket.service';
import { ToastController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new-basket',
  templateUrl: './new-basket.component.html',
  styleUrls: ['./new-basket.component.scss'],
})
export class NewBasketComponent implements OnInit {
  basketName = '';

  constructor(private basketsService: BasketService,
              public toastController: ToastController,
              private dataService: DataService) { }

  ngOnInit() {}

  async createBasket() {
    if (!this.basketName) {
      const toast = await this.toastController.create({
        message: 'Basket name is empty.',
        duration: 2000,
        showCloseButton: true,
        animated: true
      });
      toast.present();
      return;
    }
    const data = { basketName: this.basketName };
    this.basketsService.newBasket(data)
    .subscribe(async res => {
      this.dataService.changeBaskets(res.result);
      const toast = await this.toastController.create({
        message: 'New basket is created.',
        duration: 2000,
        showCloseButton: true,
        animated: true
      });
      toast.present();
    }, err => {
      console.log(err.message);
    });
  }

}
