import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ILoginAccount } from '../models/ILoginAccount'
import { LoginAccount } from '../models/LoginAccount'
import { LoginCredentials } from '../models/LoginCredentials'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(credentials: LoginCredentials): Observable<LoginAccount> {
    return this.httpClient
      .post<ILoginAccount>(
        environment.apiUrl + environment.paths.login,
        credentials,
      )
      .pipe(
        map((p: ILoginAccount) => {
          return new LoginAccount(p)
        }),
      );
  }

  public logout() {}
}
