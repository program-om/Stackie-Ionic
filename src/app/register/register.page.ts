import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { LoggedInService } from '../_services/logged-in.service';

const { Storage } = Plugins;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  // validation variables
  passMatchErr = false;
  submitted = false;

  constructor(private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private loggedInService: LoggedInService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      userName: ['', [Validators.required, Validators.pattern('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]],
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.passMatchErr = true;
      return;
    }

    this.auth.registerUser(this.registerForm.value)
    .subscribe(
      async res => {
        await Storage.set({
          key: 'token',
          value: res.token
        });
        this.loggedInService.changeLoggedIn(true);
        this.router.navigate(['/tabs/tab1']);
      },
      err => console.log(err.message)
    );
  }

}
