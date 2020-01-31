import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BasketService } from 'src/app/_services/basket.service';
import { DataService } from '../data.service';
import { CommunicationService } from '../communication.service';

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
    this.getBaskets();
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
    this.basketService.allBaskets()
    .subscribe( res => {
      this.baskets = res.result;
      this.basketsReceived = true;
    });
  }

}
