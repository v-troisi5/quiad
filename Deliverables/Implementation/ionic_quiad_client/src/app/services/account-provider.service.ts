import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Subject } from 'rxjs';
import { Account, IAccount } from '../account/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountProviderService {

  public account: Subject<Account | undefined> = new BehaviorSubject<Account | undefined>(undefined);

  constructor() {
    const token = localStorage.getItem("token");
    if(token) {
      const account: IAccount = jwtDecode(token);
      account.token = token;
      const _account: Account = new Account(account);
      this.account.next(_account);
    }
  }

}
