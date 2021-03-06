import { Component, OnInit } from '@angular/core';
import { LoggedInService } from '../_services/logged-in.service';
import { CommunicationService } from './communication.service';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  displayNewBasket = false;
  loggedIn = false;
  showReorderList = false;

  constructor(private loggedInService: LoggedInService,
              private communicationService: CommunicationService) {}

  ngOnInit() {
    this.loggedInService.loggedIn
    .subscribe( val => {
      this.loggedIn = val;
    });
    Storage.get({key: 'basketsQuestions'}).then( ret => {
      if (!ret.value) {
        Storage.set({key: 'basketsQuestions', value: '[]'}).then().catch(e => console.log(e));
      }
    });
  }

  showNewBasket() {
    if (this.displayNewBasket) {
      this.displayNewBasket = false;
    } else {
      this.displayNewBasket = true;
    }
  }

  enableReorderList() {
    this.showReorderList = true;
    this.communicationService.toggleReorderList(true);
  }

  disableReorderList() {
    this.showReorderList = false;
    this.communicationService.toggleReorderList(false);
  }

}
