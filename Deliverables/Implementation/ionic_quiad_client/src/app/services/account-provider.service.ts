import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountProviderService {

  public account: Subject<{ id: number } | undefined> = new ReplaySubject();

  constructor() {
    this.account.next({ id: 4 });
  }

}
