import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfoUrl = 'https://stackie.herokuapp.com/api/users/user-info';

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<any> {
    return this.http.get(this.userInfoUrl);
  }
}
