import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { Resp, UserInfo } from '../Types';
import { LoggedInService } from '../_services/logged-in.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  loggedIn = false;
  userInfo: UserInfo;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
              private userService: UserService,
              private loggedInService: LoggedInService) {}

  ngOnInit() {
    this.loggedInService.loggedIn
    .subscribe( val => {
      this.loggedIn = val;
      if (this.loggedIn) {
        this.userService.getUserInfo()
        .subscribe( res => {
          this.userInfo = res.result;
        });
      }
    });
  }

  goToRegister() {
    this.router.navigate(['register'], {relativeTo: this.activatedRoute});
  }

  goToLogin() {
    this.router.navigate(['login'], {relativeTo: this.activatedRoute});
  }

  isLoggedIn(): boolean {
    console.log('isLoggedIn called');
    let logged: boolean = false;
    return logged;
    // this.authService.loggedIn()
    // .then( val => {
    //   logged = val;
    // });
    // return logged;
  }

  isTrue() {
    console.log('isTrue() called');
    return true;
  }

  logOut() {
    this.authService.logoutUser()
    .then( v => {
      this.userInfo = null;
      this.loggedInService.changeLoggedIn(false);
    });
  }

}
