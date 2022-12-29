import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Account } from '../account/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountProviderService {

  public account: Subject<Account | undefined> = new ReplaySubject();

  constructor() {
  }

}
