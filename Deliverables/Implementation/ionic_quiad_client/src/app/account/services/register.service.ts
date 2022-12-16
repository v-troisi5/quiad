import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/Account';
import { IAccount } from '../models/IAccount';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  public register(registerAccount: IAccount): Observable<Account> {
    return this.httpClient.post<IAccount>(environment.apiUrl + environment.paths.register, {
      account: registerAccount
    })
      .pipe(map(account => {
        console.log(account);
        return new Account({
          ...account,
          user: new User({
            ...account.user,
            node: {
              ...account.user?.node
            }
          })
        });
      }))
  }

}
