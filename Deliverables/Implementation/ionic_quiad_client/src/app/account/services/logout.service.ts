import { Injectable } from '@angular/core';
import { AccountProviderService } from 'src/app/services/account-provider.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private accountProviderService: AccountProviderService,
  ) { }

  public logout() {
    return new Promise((resolve, reject) => {
      this.accountProviderService.account.next(undefined);
      localStorage.removeItem("token");
      resolve(undefined);
    });
  }

}
