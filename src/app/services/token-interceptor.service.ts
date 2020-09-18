import { Injectable, Injector, inject } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { onErrorResumeNext } from 'rxjs';
import { LoginService } from "./login.service";


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector: Injector) { }
  intercept(req, next) {
    let loginService = this.injector.get(LoginService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `${loginService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
