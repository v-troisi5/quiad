import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../account/models/account';
import { AccountProviderService } from '../services/account-provider.service';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  private account?: Account;

  constructor(private accountProviderService: AccountProviderService) {
    accountProviderService.account.subscribe(account => {
      this.account = account;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.account) {
      const clone = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.account.token}`
        }
      });
      return next.handle(clone);
    }
    return next.handle(req);
  }

}
