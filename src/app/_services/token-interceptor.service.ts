import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BasketService } from './basket.service';
import { from, Observable } from 'rxjs';
import { mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let authService = this.injector.get(AuthService);
    let tokkenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokkenizedReq);
  }
}

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService_second implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    const basketService = this.injector.get(BasketService);
    return from(basketService.getToken()).pipe(
      mergeMap( val => {
        let tokkenizedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${val}`
          }
        });
        let n: Observable<HttpEvent<any>> = next.handle(tokkenizedReq);
        return n;
      })
    );
  }
}

export const InterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService_second,
    multi: true
  }
];
