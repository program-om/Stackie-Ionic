import { Component, OnInit, Input } from '@angular/core';
import { CommunicationService } from '../../communication.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {

  @Input() basket;
  showReorderList = false;

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
    this.communicationService.reorderList
    .subscribe( val => {
      this.showReorderList = val;
    });
  }

}
