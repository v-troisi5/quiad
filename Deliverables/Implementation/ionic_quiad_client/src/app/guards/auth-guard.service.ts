import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AccountProviderService } from '../services/account-provider.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private accountProviderService: AccountProviderService,
    private navController: NavController
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      this.accountProviderService.account.subscribe(account => {
        console.log(account);
        if(account) resolve(true);
        else {
          this.navController.navigateRoot("/main/login");
          resolve(false)
        };
      }, error => {
        this.navController.navigateRoot("/main/login");
        resolve(false);
      });
    })
  }

}
