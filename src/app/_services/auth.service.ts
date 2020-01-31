import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = "https://stackie.herokuapp.com/api/auth/register";
  private loginUrl = "https://stackie.herokuapp.com/api/auth/login";
  private resetPassRequestUrl = "https://stackie.herokuapp.com/api/auth/reset-password";
  private newPasswordUrl = "https://stackie.herokuapp.com/api/auth/new-password/";

  constructor(private http: HttpClient,
              private router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  async logoutUser() {
    await Storage.remove({key: 'token'});
    // localStorage.removeItem('token');
    this.router.navigate(['/tabs/tab1']);
  }

  async loggedIn(): Promise<boolean> {
    const val = await this.getToken();
    if (val) return true;
    else return false;
  }

  async getToken() {
    const ret = await Storage.get({key: 'token'});
    return ret.value;
  }

  resetPasswordRequest(userData) {
    return this.http.post<any>(this.resetPassRequestUrl, userData);
  }

  newPassword(urlData, user) {
    return this.http.post<any>(this.newPasswordUrl + urlData.id + '/' + urlData.token, user);
  }
}
