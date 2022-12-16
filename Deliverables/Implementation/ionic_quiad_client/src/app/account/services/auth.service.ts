import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Account } from '../models/Account'
import { IAccount } from '../models/IAccount'
import { Node } from '../models/Node'
import { User } from '../models/User'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(credentials: Account): Observable<Account> {
    return this.httpClient
      .post<{ account: IAccount }>(environment.apiUrl + environment.paths.login, credentials)
      .pipe(
        map(({ account }: { account: IAccount }) => {
          return new Account({
            ...account,
            user: new User({
              ...account.user,
              node: new Node(account.user?.node),
            }),
          })
        }),
      )
  }

  public logout() {}

}
