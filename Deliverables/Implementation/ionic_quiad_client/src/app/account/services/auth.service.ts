import { Injectable } from '@angular/core';
import { LoginCredentials, LoginService } from './login.service';
import { LogoutService } from './logout.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private loginService: LoginService,
    private logoutService: LogoutService
  ) { }

  public login(credentials: LoginCredentials) {
    return this.loginService.login(credentials);
  }

  public logout() {
    return this.logoutService.logout();
  }

}
