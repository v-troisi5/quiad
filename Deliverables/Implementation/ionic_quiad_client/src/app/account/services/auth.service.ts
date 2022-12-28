import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Account } from '../models/Account'
import { IAccount } from '../models/IAccount'
import { Node } from '../../tree/models/Node'
import { User } from '../models/User'
import jwt_decode from "jwt-decode"

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
    const token = localStorage.getItem("token");
    if(token) {
      const account: any = jwt_decode(token);
      const _ = new Account({
        ...account,
        user: new User({
          ...account.user,
          node: new Node(account.user?.node),
        }),
        token: token
      });
      this.account = _;
    }
  }

  public login(credentials: Account): Observable<Account> {
    return this.httpClient
      .post<{ account: IAccount }>(environment.apiUrl + environment.paths.login, credentials)
      .pipe(
        map(({ account }: { account: IAccount }) => {
          this.account = new Account(account);
          localStorage.setItem("token", account.token!);
          return this.account;
        }),
      )
  }

  public logout() {
    return new Promise<void>((resolve, reject) => {
      const token = localStorage.removeItem("token");
      this.account = undefined;
      resolve();
    });
  }

  private account?: Account;
  public get Account() {
    return this.account;
  }

}
