import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/_services/basket.service';
import { NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/tab1/data.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private basketService: BasketService,
              private navParam: NavParams,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
  }

  deleteBasket() {
    this.basketService.deleteBasket(this.navParam.data.basketId)
    .subscribe(res => {
      this.dataService.changeBaskets(res.result);
      this.router.navigate(['/tabs/tab1']);
    });
  }

}
