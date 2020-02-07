import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BasketService } from 'src/app/_services/basket.service';
import { DataService } from '../data.service';
import { CommunicationService } from '../communication.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.scss'],
})
export class BasketListComponent implements OnInit {

  baskets = [];
  basketsReceived = false;
  reorderList: boolean;
  @ViewChild('reorder', {static: false}) reorderGroup: ElementRef;

  constructor(private basketService: BasketService,
              private dataService: DataService,
              private communicationService: CommunicationService) { }

  ngOnInit() {
    // await Storage.get({key: 'baskets'});
    // if baskets list exist in storage
    //    get baskets list
    // else
    //    make http call to retrieve baskets
    Storage.get({key: 'baskets'}).then( val => {
      if (val.value) {
        this.baskets = JSON.parse(val.value);
        this.basketsReceived = true;
      } else {
        this.getBaskets();
      }
    }).catch( err => console.log(err));
    
    this.dataService.currentBaskets
    .subscribe( baskets => {
      this.baskets = baskets;
    });
    this.communicationService.reorderList
    .subscribe( val => {
      this.reorderList = val;
      if (this.reorderList) {
        addEventListener('ionItemReorder', this.reorderItems);
      } else {
        removeEventListener('ionItemReorder', this.reorderItems);
      }
    });
  }

  reorderItems(e) {
    e.detail.complete();
  }

  getBaskets() {
    this.basketsReceived = false;
    this.basketService.allBaskets()
    .subscribe( async res => {
      this.baskets = res.result;
      this.basketsReceived = true;
      await Storage.set({
        key: 'baskets',
        value: JSON.stringify(res.result)
      });
    });
  }

}
