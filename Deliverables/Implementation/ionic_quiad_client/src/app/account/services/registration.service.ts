import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account, IAccount } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  public register(account: RegistrationAccount) {
    return this.httpClient.post<IAccount>(environment.apiUrl + environment.paths.register, { account })
      .pipe(map(account => {
        const _ = new Account(account);
        return _;
      }));
  }

}

export interface RegistrationAccount {

  username: string;
  email: string;
  password: string;
  user: {
    residence: string;
    node: {
      firstname: string;
      lastname: string;
      birthplace: string;
      birthdate: string;
      sex: "MALE" | "FEMALE";
    }
  }

}
