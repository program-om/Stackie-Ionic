import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { LoggedInService } from '../_services/logged-in.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginUserData = {email: '', password: ''};
  submitted = false;
  loginForm: FormGroup;

  constructor(private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private loggedInService: LoggedInService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() { return this.loginForm.controls; }

  loginUser() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.auth.loginUser(this.loginForm.value)
      .subscribe(
        async res => {
          await Storage.set({
            key: 'token',
            value: res.token
          });
          this.loggedInService.changeLoggedIn(true);
          this.router.navigate(['/tabs/tab1']);
        },
        err => console.log(err)
      );
  }

}
