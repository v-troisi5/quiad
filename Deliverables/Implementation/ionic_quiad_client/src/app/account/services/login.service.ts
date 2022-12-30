import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AccountProviderService } from 'src/app/services/account-provider.service';
import { environment } from 'src/environments/environment';
import { Account, IAccount } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private accountProviderService: AccountProviderService
  ) { }

  public login(credentials: LoginCredentials): Observable<Account> {
    return this.httpClient
      .post<{ account: IAccount }>(environment.apiUrl + environment.paths.login, credentials)
      .pipe(map(({ account }) => {
        const _account = new Account(account);
        this.accountProviderService.account.next(_account);
        if(credentials.rememberMe) {
          localStorage.setItem("token", account.token)
        }
        return _account;
      }));
  }

}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe: boolean;
}
