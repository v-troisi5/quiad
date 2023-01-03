import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Account, IAccount } from '../account/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountProviderService {

  public account: Subject<Account | undefined> = new BehaviorSubject<Account | undefined>(undefined);

  constructor() {
    const _: string | null = localStorage.getItem("account");
    if(_) {
      const iaccount: IAccount = JSON.parse(_);
      const account: Account = new Account(iaccount);
      this.account.next(account);
    }
  }

  public save(account: any) {
    const _ = JSON.parse(JSON.stringify(account));
    _.user.tree = undefined;
    _.user.node.documents = undefined;
    if(_.user.node.father) _.user.node.father.documents = undefined;
    if(_.user.node.mother) _.user.node.father.mother = undefined;
    localStorage.setItem("account", JSON.stringify(_));
  }

}
